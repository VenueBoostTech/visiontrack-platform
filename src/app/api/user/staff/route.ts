// app/api/user/staff/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        ownedBusiness: true,
        workingAt: true
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // If user is business owner, get all staff from their business
    if (user.role === "BUSINESS_OWNER" && user.ownedBusiness) {
      const staff = await prisma.businessStaff.findMany({
        where: {
          businessId: user.ownedBusiness.id
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
    }

    return new NextResponse("Unauthorized", { status: 401 });
  } catch (error) {
    console.error("[STAFF_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, email, departmentId } = body;

    if (!name || !email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        ownedBusiness: true
      }
    });

    if (!user || user.role !== "BUSINESS_OWNER" || !user.ownedBusiness) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create new staff user
    const newStaffUser = await prisma.user.create({
      data: {
        name,
        email,
        role: "STAFF",
        emailVerified: new Date(), // Auto verify since created by business owner
      }
    });

    // Create business staff relationship
    const businessStaff = await prisma.businessStaff.create({
      data: {
        businessId: user.ownedBusiness.id,
        userId: newStaffUser.id,
        departmentId: departmentId,
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

    return NextResponse.json(businessStaff);
  } catch (error) {
    console.error("[STAFF_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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