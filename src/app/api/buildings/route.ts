// app/api/buildings/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const building = await prisma.building.create({
      data,
      include: {
        property: true,
        zones: true
      }
    });
    
    return NextResponse.json(building);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create building' }, 
      { status: 500 }
    );
  }
}