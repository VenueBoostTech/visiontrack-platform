// app/api/cameras/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from 'zod';
import vtClient from "../../../../../lib/vt-external-api/client";
import { VTCameraService } from '@/lib/vt-external-api/services/vt-camera.service';

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


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const camera = await prisma.camera.findUnique({
      where: { id: params.id },
      include: {
        zone: {
          include: {
            building: {
              include: {
                property: true
              }
            },
          }
        },
        store: true
      }
    });

    if (!camera) {
      return NextResponse.json({ error: 'Camera not found' }, { status: 404 });
    }

    return NextResponse.json(camera);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch camera' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Validate input data
    const validationResult = cameraSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const camera = await prisma.camera.findUnique({
      where: { id: params.id },
    });

    if (!camera) {
      return NextResponse.json(
        { error: "Camera not found" },
        { status: 404 }
      );
    }

    if (camera.businessId !== user?.ownedBusiness?.id) {
      return NextResponse.json(
        { error: "You do not have permission to update this camera" },
        { status: 403 }
      );
    }

    if (user.ownedBusiness.vtCredentials && camera.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      let payload : any = {
        camera_id: camera.id,
        rtsp_url: validationResult.data.rtspUrl,
        property_id: property.vtId,
        zone_id: zone.vtId,
        name: validationResult.data.name,
        ...(validationResult.data.location ? { floor: validationResult.data.location } : {}),
        ...(validationResult.data.direction ? { floor: validationResult.data.direction } : {}),
        status: validationResult.data.status,
        capabilities: validationResult.data.capabilities,
      }
      if(zone.store){
        payload = {
          ...payload,
          store_id: zone.store.id,
        }
      } else {
        payload = {
          ...payload,
          store_id: null,
        }
      }
      console.log(payload);
      
      const response: any = await VTCameraService.updateCamera(camera.vtId, payload);        
    }

    const {propertyId, ...updateData} = data
    const updatedCamera = await prisma.camera.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(updatedCamera);
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      { error: 'Failed to update camera' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { cameraId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const camera = await prisma.camera.update({
      where: {
        id: params.cameraId,
      },
      data,
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

    return NextResponse.json(camera);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update camera' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      include: {
        ownedBusiness: {
          include: {
            vtCredentials: true,
          },
        },
      },
    });

    // For delete properties, we still require BUSINESS_OWNER role
    if (user?.role !== "BUSINESS_OWNER") {
      return NextResponse.json(
        { error: "Only business owners can delete Camera" },
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "No business found for this user" },
        { status: 404 }
      );
    }

    const camera = await prisma.camera.findUnique({
      where: { id: params.id },
    });

    if (!camera) {
      return NextResponse.json(
        { error: "Camera not found" },
        { status: 404 }
      );
    }

    await prisma.camera.delete({
      where: { id: params.id }
    });

    if (user.ownedBusiness && user.ownedBusiness.vtCredentials && camera.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTCameraService.deleteCamera(camera.vtId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete camera' },
      { status: 500 }
    );
  }
}