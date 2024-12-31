// app/api/cameras/[id]/route.ts
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

    const data = await request.json();
    
    const camera = await prisma.camera.update({
      where: { id: params.id },
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

    await prisma.camera.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete camera' }, 
      { status: 500 }
    );
  }
}