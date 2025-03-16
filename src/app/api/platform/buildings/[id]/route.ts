// app/api/platform/buildings/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from 'zod';
import vtClient from "../../../../../lib/vt-external-api/client";
import { VTBuildingService } from '@/lib/vt-external-api/services/vt-building.service';


const buildingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  propertyId: z.string().min(1, "Property id is required"),
  floorCount: z.number().min(1, "Total floor is required"),
  belowGroundFloors: z.union([z.number(), z.null()]).optional(),
});


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate input data
    const validationResult = buildingSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Verify user exists and belongs to user's business
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

    const building = await prisma.building.findUnique({
      where: { id: params.id },
    });

    if (!building) {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    if (building.businessId !== user?.ownedBusiness?.id) {
      return NextResponse.json(
        { error: "You do not have permission to update this building" },
        { status: 403 }
      );
    }

    const property = await prisma.property.findFirst({
      where: {
        id: validationResult.data.propertyId
      }
    })

    if (!property) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 }
      );
    }

    if (user.ownedBusiness.vtCredentials && building.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTBuildingService.updateBuilding({
        id: building.vtId,
        name: validationResult.data.name,
        property_id: property.vtId,
        ...(validationResult.data.belowGroundFloors ? { belowGroundFloors: validationResult.data.belowGroundFloors } : {}),
        total_floors: validationResult.data.floorCount,
      });
    }

    const updateBuilding = await prisma.building.update({
      where: { id: params.id },
      data,
      include: {
        property: true,
        zones: true
      }
    });

    return NextResponse.json(updateBuilding);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update building' },
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

    // For delete buildings, we still require BUSINESS_OWNER role
    if (user?.role !== "BUSINESS_OWNER") {
      return NextResponse.json(
        { error: "Only business owners can delete buildings" },
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "No business found for this user" },
        { status: 404 }
      );
    }

    const building = await prisma.building.findUnique({
      where: { id: params.id },
    });

    if (!building) {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    if (building.businessId !== user?.ownedBusiness?.id) {
      return NextResponse.json(
        { error: "You do not have permission to delete this building" },
        { status: 403 }
      );
    }

    await prisma.building.delete({
      where: { id: params.id }
    });

    if (user.ownedBusiness && user.ownedBusiness.vtCredentials && building.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTBuildingService.deleteBuildings(building.vtId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete building' },
      { status: 500 }
    );
  }
}
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const building = await prisma.building.findUnique({
      where: { id: params.id },
      include: {
        property: true,
        zones: {
          include: {
            cameras: true
          }
        }
      }
    });

    if (!building) {
      return NextResponse.json({ error: 'Building not found' }, { status: 404 });
    }

    return NextResponse.json(building);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch building' },
      { status: 500 }
    );
  }
}