// app/api/user/staff/route.ts

// Create staff member
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name, email, password, businessId } = body;

    if (!name || !email || !password || !businessId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verify business owner
    const businessOwner = await prisma.user.findFirst({
      where: { 
        id: session.user.id,
        role: "BUSINESS_OWNER",
        ownedBusiness: {
          id: businessId
        }
      }
    });

    if (!businessOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    // Create new user
    const hashedPassword = await hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STAFF",
        emailVerified: new Date()
      }
    });

    // Create business staff relationship
    const staff = await prisma.businessStaff.create({
      data: {
        businessId,
        userId: user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        }
      }
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.error("[STAFF_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// app/api/staff/[staffId]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";

// Update staff member
export async function PUT(
  req: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { staffId } = params;
    const body = await req.json();
    const { name, email } = body;

    if (!staffId || !name || !email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get staff member and verify business owner
    const businessStaff = await prisma.businessStaff.findUnique({
      where: { id: staffId },
      include: {
        business: {
          include: {
            owner: true
          }
        },
        user: true
      }
    });

    if (!businessStaff || businessStaff.business.owner.id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if new email exists (if email is being changed)
    if (email !== businessStaff.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return new NextResponse("Email already exists", { status: 400 });
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: businessStaff.userId },
      data: { name, email }
    });

    // Get updated staff record
    const updatedStaff = await prisma.businessStaff.findUnique({
      where: { id: staffId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        }
      }
    });

    return NextResponse.json(updatedStaff);
  } catch (error) {
    console.error("[STAFF_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Delete staff member
export async function DELETE(
  req: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { staffId } = params;
    if (!staffId) {
      return new NextResponse("Staff ID required", { status: 400 });
    }

    // Get staff member and verify business owner
    const businessStaff = await prisma.businessStaff.findUnique({
      where: { id: staffId },
      include: {
        business: {
          include: {
            owner: true
          }
        }
      }
    });

    if (!businessStaff || businessStaff.business.owner.id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete business staff relationship
    await prisma.businessStaff.delete({
      where: { id: staffId }
    });

    // Optionally: Delete user account if no longer needed
    // await prisma.user.delete({
    //   where: { id: businessStaff.userId }
    // });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[STAFF_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}