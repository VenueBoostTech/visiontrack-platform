import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from 'zod';

const propertySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'MIXED', 'RETAIL']),
  address: z.string().min(1, 'Address is required'),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in' }, 
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      include: { ownedBusiness: true }
    });

    if (user?.role !== 'BUSINESS_OWNER') {
      return NextResponse.json(
        { error: 'Only business owners can create properties' }, 
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: 'No business found for this user' }, 
        { status: 404 }
      );
    }

    const data = await request.json();
    
    // Validate input data
    const validationResult = propertySchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message }, 
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        ...validationResult.data,
        businessId: user.ownedBusiness.id,
      },
      include: {
        buildings: true
      }
    });
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Property creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create property. Please try again.' }, 
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const session = await getAuthSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const properties = await prisma.property.findMany({
      include: {
        buildings: {
          include: {
            zones: true
          }
        }
      }
    });
    
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' }, 
      { status: 500 }
    );
  }
}
