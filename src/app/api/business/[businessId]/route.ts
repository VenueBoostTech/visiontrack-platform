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

    // Validate business ID
    if (!params.businessId || typeof params.businessId !== 'string') {
      return new NextResponse("Invalid business ID", { status: 400 });
    }

    // Parse and validate request body
    const body = await req.json();
    if (!body.business) {
      return new NextResponse("Missing business data", { status: 400 });
    }

    const { business } = body;

    // Check if business exists
    const existingBusiness = await prisma.business.findUnique({
      where: { id: params.businessId }
    });

    if (!existingBusiness) {
      return new NextResponse("Business not found", { status: 404 });
    }

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
    // Return more detailed error message
    // @ts-ignore
    return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
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

    // Use a transaction to ensure all deletions succeed or none do
    await prisma.$transaction(async (tx) => {
      // Delete all related records first
      await tx.notificationChannel.deleteMany({
        where: { businessId: params.businessId }
      });
      
      await tx.businessPreferences.deleteMany({
        where: { businessId: params.businessId }
      });
      
       // @ts-ignore
      await tx.vtApiCredential.deleteMany({
        where: { businessId: params.businessId }
      });
      
      await tx.alertRule.deleteMany({
        where: { businessId: params.businessId }
      });
      
      await tx.note.deleteMany({
        where: { businessId: params.businessId }
      });
      
      await tx.businessStaff.deleteMany({
        where: { businessId: params.businessId }
      });

      // Finally delete the business
      await tx.business.delete({
        where: { id: params.businessId }
      });
    });

    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error("[BUSINESS_DELETE]", error);
     // @ts-ignore
    return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
  }
}