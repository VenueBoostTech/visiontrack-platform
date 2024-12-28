// app/api/user/zones/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { ownedBusiness: true }
    });

    // Verify ownership and existence
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

    const zoneData = {
      name: data.name,
      type: data.type,
      floor: data.floor,
      buildingId: data.buildingId,
      propertyId: building.propertyId,
      ...(data.type === 'RETAIL' && data.storeId ? { storeId: data.storeId } : {})
    };

    const zone = await prisma.zone.update({
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
    
    return NextResponse.json(zone);
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
      where: { id: session.user.id },
      include: { ownedBusiness: true }
    });

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
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Zone deletion error:", error);
    return NextResponse.json(
      { error: 'Failed to delete zone' }, 
      { status: 500 }
    );
  }
}