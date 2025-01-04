// app/api/business/[businessId]/route.ts
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { businessId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { business } = await req.json();
    
    const updatedBusiness = await prisma.business.update({
      where: {
        id: params.businessId
      },
      data: {
        name: business.name,
        email: business.email,
        phone: business.phone,
        address: business.address,
        vt_use_scenario: business.vt_use_scenario,
      },
      include: {
        owner: true,
        staff: {
          include: {
            user: true
          }
        }
      }
    });

    return NextResponse.json(updatedBusiness);
    
  } catch (error) {
    console.error("[BUSINESS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { businessId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First, delete related staff entries
    await prisma.businessStaff.deleteMany({
      where: {
        businessId: params.businessId
      }
    });

    // Then delete the business
    await prisma.business.delete({
      where: {
        id: params.businessId
      }
    });

    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error("[BUSINESS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}