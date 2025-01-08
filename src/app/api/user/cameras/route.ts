// app/api/cameras/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { VTCameraService } from "@/lib/vt-external-api/services/vt-camera.service";
import vtClient from '../../../../lib/vt-external-api/client'
import { z } from "zod";

const cameraSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rtspUrl: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
  // propertyId: z.string(),
  // zoneId: z.string(),
  capabilities: z.union([z.string(), z.null()]).optional(),
  store_id: z.union([z.string(), z.null()]).optional(),
  location: z.union([z.string(), z.null()]).optional(),
  direction: z.union([z.string(), z.null()]).optional(),
  type: z.enum(["INDOOR", "OUTDOOR", "THERMAL"]),
});


export async function GET() {
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

    const cameras = await prisma.camera.findMany({
      where: {
        zone: {
          property: {
            businessId: businessId,
          },
        },
      },
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
    const validationResult = cameraSchema.safeParse(data);
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

      const response: any = await VTCameraService.createCamera({
        camera_id: camera.id,
        rtsp_url: validationResult.data.rtspUrl,
        property_id: property.vtId,
        zone_id: zone.vtId,
        name: validationResult.data.name,
        ...(validationResult.data.location ? { floor: validationResult.data.location } : {}),
        ...(validationResult.data.direction ? { floor: validationResult.data.direction } : {}),
        status: validationResult.data.status,
        capabilities: validationResult.data.capabilities,
      });      
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
