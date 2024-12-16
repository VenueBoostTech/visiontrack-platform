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

    const zones = await prisma.zone.findMany({
      include: {
        building: {
          include: {
            property: true
          }
        },
        cameras: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(zones);
  } catch (error) {
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
      
      const zone = await prisma.zone.create({
        data: {
          name: data.name,
          type: data.type,
          floor: data.floor,
          buildingId: data.buildingId,
          propertyId: data.propertyId, // Add this
        },
        include: {
          building: {
            include: {
              property: true
            }
          },
          cameras: true
        }
      });
      
      return NextResponse.json(zone);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to create zone' }, 
        { status: 500 }
      );
    }
  }