// app/api/user/zones/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from 'zod';
import vtClient from "../../../../../lib/vt-external-api/client";
import { VTZoneService } from '@/lib/vt-external-api/services/vt-zone.service';


const zoneSchema = z.object({
  name: z.string().min(1, "Name is required"),
  propertyId: z.string(),
  buildingId: z.string(),
  type: z.string(),
  floor: z.union([z.number(), z.null()]).optional(),
  storeId: z.string().optional(),
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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { ownedBusiness: true }
    });

    const zone = await prisma.zone.findFirst({
      where: {
        id: params.id,
        property: {
          businessId: user?.ownedBusiness?.id
        }
      },
      include: {
        property: true,
        building: {
          include: {
            property: true
          }
        },
        store: true,
        cameras: true
      }
    });

    if (!zone) {
      return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
    }

    return NextResponse.json(zone);
  } catch (error) {
    console.error("Zone GET error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch zone' },
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
      return NextResponse.json(
        { error: 'You must be logged in' }, { status: 401 });
    }

    const data = await request.json();

    // Validate input data
    const validationResult = zoneSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Verify property exists and belongs to user's business
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

    // Verify ownership and existence of zone
    const existingZone = await prisma.zone.findFirst({
      where: {
        id: params.id,
        property: {
          businessId: user?.ownedBusiness?.id
        }
      }
    });

    if (!existingZone) {
      return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
    }

    if (existingZone.businessId !== user?.ownedBusiness?.id) {
      return NextResponse.json(
        { error: "You do not have permission to update this zone" },
        { status: 403 }
      );
    }

    const building = await prisma.building.findFirst({
      where: {
        id: data.buildingId,
        property: {
          businessId: user?.ownedBusiness?.id
        }
      }
    });

    if (!building) {
      return NextResponse.json({ error: 'Building not found' }, { status: 404 });
    }
    const property = await prisma.property.findFirst({
      where: {
        id: data.propertyId,
        businessId: user.ownedBusiness.id,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const zoneData = {
      name: data.name,
      type: data.type,
      floor: data.floor,
      buildingId: data.buildingId,
      propertyId: building.propertyId,
      ...(data.type === 'RETAIL' && data.storeId ? { storeId: data.storeId } : {})
    };

    if (user.ownedBusiness.vtCredentials && existingZone.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTZoneService.updateZone({
        id: existingZone.vtId,
        property_id: property.vtId,
        building_id: building.vtId,
        name: validationResult.data.name,
        type: validationResult.data.type,
        ...(validationResult.data.floor ? { floor: validationResult.data.floor } : {})
      });
    }

    const updatedZone = await prisma.zone.update({
      where: { id: params.id },
      data: zoneData,
      include: {
        property: true,
        building: {
          include: {
            property: true
          }
        },
        store: true,
        cameras: true
      }
    });

    return NextResponse.json(updatedZone);
  } catch (error) {
    console.error("Zone update error:", error);
    return NextResponse.json(
      { error: 'Failed to update zone' },
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

    // For delete zone, we still require BUSINESS_OWNER role
    if (user?.role !== "BUSINESS_OWNER") {
      return NextResponse.json(
        { error: "Only business owners can delete zone" },
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "No business found for this user" },
        { status: 404 }
      );
    }


    // Verify ownership before deletion
    const zone = await prisma.zone.findFirst({
      where: {
        id: params.id,
        property: {
          businessId: user?.ownedBusiness?.id
        }
      }
    });

    if (!zone) {
      return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
    }

    await prisma.zone.delete({
      where: { id: params.id }
    });

    if (user.ownedBusiness && user.ownedBusiness.vtCredentials && zone.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTZoneService.deleteZone(zone.vtId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Zone deletion error:", error);
    return NextResponse.json(
      { error: 'Failed to delete zone' },
      { status: 500 }
    );
  }
}