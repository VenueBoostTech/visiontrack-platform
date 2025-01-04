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

    // Log the deletion attempt
    console.log(`Attempting to delete business: ${params.businessId}`);

    // First check if the business exists
    const business = await prisma.business.findUnique({
      where: { id: params.businessId },
      include: {
        staff: true,
        properties: {
          include: {
            buildings: {
              include: {
                zones: {
                  include: {
                    cameras: true
                  }
                }
              }
            }
          }
        },
        notificationChannels: true,
        preferences: true,
        vtCredentials: true,
        alertRules: true,
        notes: true
      }
    });

    if (!business) {
      console.log(`Business ${params.businessId} not found`);
      return new NextResponse("Business not found", { status: 404 });
    }

    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Delete cameras first (deepest level)
      for (const property of business.properties) {
        for (const building of property.buildings) {
          for (const zone of building.zones) {
            if (zone.cameras.length > 0) {
              console.log(`Deleting cameras for zone ${zone.id}`);
              await tx.camera.deleteMany({
                where: { zoneId: zone.id }
              });
            }
          }
        }
      }

      // Delete zones
      for (const property of business.properties) {
        for (const building of property.buildings) {
          console.log(`Deleting zones for building ${building.id}`);
          await tx.zone.deleteMany({
            where: { buildingId: building.id }
          });
        }
      }

      // Delete buildings
      for (const property of business.properties) {
        console.log(`Deleting buildings for property ${property.id}`);
        await tx.building.deleteMany({
          where: { propertyId: property.id }
        });
      }

      // Delete properties
      console.log(`Deleting properties for business ${params.businessId}`);
      await tx.property.deleteMany({
        where: { businessId: params.businessId }
      });

      // Delete other related records
      console.log('Deleting related records...');
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
      console.log('Deleting business...');
      await tx.business.delete({
        where: { id: params.businessId }
      });
    });

    console.log(`Successfully deleted business ${params.businessId}`);
    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error("[BUSINESS_DELETE] Detailed error:", {
      // @ts-ignore
      error: error.message,
      // @ts-ignore
      stack: error.stack,
      businessId: params.businessId
    });
    
    // Return a more detailed error message
    return new NextResponse(
      JSON.stringify({
        error: "Failed to delete business",
        // @ts-ignore
        details: error.message
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}