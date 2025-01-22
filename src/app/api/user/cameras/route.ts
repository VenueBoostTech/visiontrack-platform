// app/api/cameras/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { VTCameraService } from "@/lib/vt-external-api/services/vt-camera.service";
import vtClient from '../../../../lib/vt-external-api/client'
import { z } from "zod";

const cameraSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rtspUrl: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
  capabilities: z.record(z.boolean()).optional(),
  store_id: z.union([z.string(), z.null()]).optional(),
  location: z.union([z.string(), z.null()]).optional(),
  direction: z.union([z.string(), z.null()]).optional(),
  type: z.enum(["INDOOR", "OUTDOOR", "THERMAL"]),
});


export async function GET(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user with business relationships
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    // Get business ID based on role
    const businessId =
      user?.role === "BUSINESS_OWNER"
        ? user.ownedBusiness?.id
        : // @ts-ignore
        user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json([]);
    }

    // Get camera with filters
    const name: string = request.nextUrl.searchParams.get("name") || ""
    const type: string = request.nextUrl.searchParams.get("type") || ""
    const status: string = request.nextUrl.searchParams.get("status") || ""
    const zoneId: string = request.nextUrl.searchParams.get("zone") || ""
    const buildingId: string = request.nextUrl.searchParams.get("building") || ""

    const where: any = {
      zone: {
        property: {
          businessId: businessId,
        },
      },
      ...(zoneId ? { zone: { vtId: zoneId } } : {}),
      ...(type ? { type: type } : {}),
      ...(status ? { status: status } : {}),
      ...(name ? { name: { contains: name, mode: "insensitive", }, } : {}),
      ...(buildingId ? { zone: { building: { vtId: buildingId } } } : {}),
    }

    const cameras = await prisma.camera.findMany({
      where: where,
      include: {
        zone: {
          include: {
            building: {
              include: {
                property: true,
              },
            },
            store: true,
          },
        },
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cameras);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cameras" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user with business relationships
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        ownedBusiness: {
          include: {
            vtCredentials: true,
          },
        },
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    // For creating properties, we still require BUSINESS_OWNER role
    if (user?.role !== "BUSINESS_OWNER") {
      return NextResponse.json(
        { error: "Only business owners can create properties" },
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "No business found for this user" },
        { status: 404 }
      );
    }

    const data = await request.json();

    const businessId =
      user?.role === "BUSINESS_OWNER"
        ? user.ownedBusiness?.id
        : // @ts-ignore
        user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json({ error: "No business found" }, { status: 404 });
    }

    // First, get the zone and verify it belongs to the user's business
    const zone = await prisma.zone.findFirst({
      where: {
        id: data.zoneId,
        property: {
          businessId: businessId,
        },
      },
      include: {
        store: true,
        property: true,
      },
    });

    if (!zone) {
      return NextResponse.json(
        { error: "Zone not found or unauthorized" },
        { status: 404 }
      );
    }

    const property = await prisma.property.findFirst({
      where: {
        id: data.propertyId,
        businessId: businessId,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found or unauthorized" },
        { status: 404 }
      );
    }

    // Prepare the camera creation data
    const createData: any = {
      name: data.name,
      rtspUrl: data.rtspUrl,
      type: data.type,
      status: data.status,
      direction: data.direction,
      location: data.location,
      capabilities: data.capabilities,
      zone: {
        connect: { id: data.zoneId },
      },
    };

    // Only connect to store if the zone has one
    if (zone.store) {
      createData.store = {
        connect: { id: zone.store.id },
      };
    }

    const camera = await prisma.camera.create({
      data: createData,
      include: {
        zone: {
          include: {
            building: {
              include: {
                property: true,
              },
            },
            store: true,
          },
        },
        store: true,
      },
    });

    // Validate input data
    const validationResult: any = cameraSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    let vtId = null;
    if (user.ownedBusiness.vtCredentials) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      let payload: any = {
        camera_id: camera.id,
        rtsp_url: validationResult.data.rtspUrl,
        property_id: property.vtId,
        zone_id: zone.vtId,
        name: validationResult.data.name,
        ...(validationResult.data.location ? { floor: validationResult.data.location } : {}),
        ...(validationResult.data.direction ? { floor: validationResult.data.direction } : {}),
        status: validationResult.data.status,
      }
      if (zone.store) {
        payload = {
          ...payload,
          store_id: zone.store.id,
        }
      }
      let cameraCapability: any = []

      if (validationResult.data.capabilities) {
        Object.keys(validationResult.data.capabilities).forEach(key => {
          if (validationResult.data.capabilities[key]) {
            cameraCapability.push(key);
          }
        });
        payload = {
          ...payload,
          capabilities: cameraCapability,
        }
      }

      const response: any = await VTCameraService.createCamera(payload);
      vtId = response.id;
    }

    const updateCamera = await prisma.camera.update({
      where: { id: camera.id },
      data: {
        ...createData,
        vtId: vtId,
        businessId: businessId
      },
      include: {
        zone: {
          include: {
            building: {
              include: {
                property: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(updateCamera);
  } catch (error) {
    console.error("Full error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create camera",
      },
      { status: 500 }
    );
  }
}
