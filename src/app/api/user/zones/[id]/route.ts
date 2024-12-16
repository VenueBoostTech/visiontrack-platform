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

    const zone = await prisma.zone.findUnique({
      where: { id: params.id },
      include: {
        building: {
          include: {
            property: true
          }
        },
        cameras: true
      }
    });

    if (!zone) {
      return NextResponse.json({ error: 'Zone not found' }, { status: 404 });
    }
    
    return NextResponse.json(zone);
  } catch (error) {
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
    
    const zone = await prisma.zone.update({
      where: { id: params.id },
      data,
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

    await prisma.zone.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete zone' }, 
      { status: 500 }
    );
  }
}