// app/api/cameras/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { VTCameraService } from "@/lib/vt-external-api/services/vt-camera.service";

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
        ownedBusiness: true,
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    const businessId =
      user?.role === "BUSINESS_OWNER"
        ? user.ownedBusiness?.id
        : // @ts-ignore
          user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json({ error: "No business found" }, { status: 404 });
    }

    const credential = await prisma.vTApiCredential.findFirst({
        where: {
          businessId: businessId,
        },
      });

    const data = await request.json();

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

    if (camera) {
      await VTCameraService.createCamera({
        camera_id: camera.id,
        rtsp_url: camera.rtspUrl,
        status: camera.status,
        zone_id: camera.zoneId,
        property_id: data.propertyId,
        capabilities: camera.capabilities || [],
        name: camera.name,
        location: camera.location || "",
        direction: camera.direction || "",
        credentials: {
          platform_id: credential?.platform_id,
          api_key: credential?.api_key,
          business_id: credential?.businessId,
        },
      });
    }

    return NextResponse.json(camera);
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
