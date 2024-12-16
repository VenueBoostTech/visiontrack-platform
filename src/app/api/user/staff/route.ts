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
    const { name, email } = body;

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
        userId: newStaffUser.id
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