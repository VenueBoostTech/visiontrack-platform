import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from 'zod';

const propertySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'MIXED', 'RETAIL']),
  address: z.string().min(1, 'Address is required'),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in' }, 
        { status: 401 }
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

    // Verify property exists and belongs to user's business
    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      include: { ownedBusiness: true }
    });

    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' }, 
        { status: 404 }
      );
    }

    if (property.businessId !== user?.ownedBusiness?.id) {
      return NextResponse.json(
        { error: 'You do not have permission to update this property' }, 
        { status: 403 }
      );
    }

    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: validationResult.data,
      include: {
        buildings: true
      }
    });
    
    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error('Property update error:', error);
    return NextResponse.json(
      { error: 'Failed to update property. Please try again.' }, 
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

    const property = await prisma.property.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete property' }, 
      { status: 500 }
    );
  }
}