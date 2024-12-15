// app/api/buildings/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

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
      
      const building = await prisma.building.update({
        where: { id: params.id },
        data,
        include: {
          property: true,
          zones: true
        }
      });
      
      return NextResponse.json(building);
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

    await prisma.building.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete building' }, 
      { status: 500 }
    );
  }
}