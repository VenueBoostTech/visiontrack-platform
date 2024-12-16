// app/api/staff/[staffId]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function PUT(
  request: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const owner = await prisma.user.findFirst({
      where: { 
        id: session.user.id,
        role: "BUSINESS_OWNER"
      },
      include: {
        ownedBusiness: true,
      }
    });

    if (!owner?.ownedBusiness) {
      return NextResponse.json(
        { error: 'Only business owners can update staff' }, 
        { status: 403 }
      );
    }

    const data = await request.json();

    const staff = await prisma.businessStaff.update({
      where: { 
        id: params.staffId,
        businessId: owner.ownedBusiness.id // Ensure staff belongs to owner's business
      },
      data: {
        user: {
          update: {
            name: data.name,
            email: data.email,
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          }
        },
        business: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error('Staff update error:', error);
    return NextResponse.json(
      { error: 'Failed to update staff member' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const owner = await prisma.user.findFirst({
      where: { 
        id: session.user.id,
        role: "BUSINESS_OWNER"
      },
      include: {
        ownedBusiness: true,
      }
    });

    if (!owner?.ownedBusiness) {
      return NextResponse.json(
        { error: 'Only business owners can remove staff' }, 
        { status: 403 }
      );
    }

    // First, get the staff member to ensure they belong to the owner's business
    const staffMember = await prisma.businessStaff.findFirst({
      where: {
        id: params.staffId,
        businessId: owner.ownedBusiness.id
      },
      include: {
        user: true
      }
    });

    if (!staffMember) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    // Start a transaction to handle both deletes
    await prisma.$transaction([
      // First remove the business staff record
      prisma.businessStaff.delete({
        where: { id: params.staffId }
      }),
      // Then update the user to remove their role
      prisma.user.update({
        where: { id: staffMember.user.id },
        data: {
          role: 'STAFF' // Reset to default role
        }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Staff deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to remove staff member' }, 
      { status: 500 }
    );
  }
}