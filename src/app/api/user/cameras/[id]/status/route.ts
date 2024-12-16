// app/api/cameras/[id]/status/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();
    
    const camera = await prisma.camera.update({
      where: { id: params.id },
      data: { status },
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
      { error: 'Failed to update camera status' }, 
      { status: 500 }
    );
  }
}