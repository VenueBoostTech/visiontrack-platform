// app/api/user/zones/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's business
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { ownedBusiness: true }
    });

    if (!user?.ownedBusiness) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const zones = await prisma.zone.findMany({
      where: {
        property: {
          businessId: user.ownedBusiness.id
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(zones);
  } catch (error) {
    console.error("Zones GET error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch zones' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Verify the building and property belong to the user's business
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { ownedBusiness: true }
    });

    if (!user?.ownedBusiness) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const building = await prisma.building.findFirst({
      where: { 
        id: data.buildingId,
        property: {
          businessId: user.ownedBusiness.id
        }
      },
      include: { property: true }
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

    const zone = await prisma.zone.create({
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
    console.error("Zone creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create zone' }, 
      { status: 500 }
    );
  }
}