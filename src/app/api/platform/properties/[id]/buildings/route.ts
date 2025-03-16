// app/api/platform/properties/[id]/buildings/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const building = await prisma.building.create({
      data: {
        ...data,
        propertyId: params.id
      }
    });
    
    return NextResponse.json(building);
  } catch (error) {
    console.error('Building creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create building' }, 
      { status: 500 }
    );
  }
}