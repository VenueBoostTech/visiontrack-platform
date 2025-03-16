import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from "zod";
import vtClient from "../../../../../lib/vt-external-api/client";
import { VTPropertiesService } from "@/lib/vt-external-api/services/vt-properties.service";

const propertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "MIXED", "RETAIL"]),
  address: z.string().min(1, "Address is required"),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in" }, 
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
      include: {
        ownedBusiness: {
          include: {
            vtCredentials: true,
          },
        },
      },
    });

    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.businessId !== user?.ownedBusiness?.id) {
      return NextResponse.json(
        { error: "You do not have permission to update this property" },
        { status: 403 }
      );
    } 

    if (user.ownedBusiness.vtCredentials && property.vtId) {  
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTPropertiesService.updateProperties({
        id: property.vtId,
        name: validationResult.data.name,
        type: validationResult.data.type,
        address: validationResult.data.address,
      });
    }

    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: validationResult.data,
      include: {
        buildings: true,
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Property update error:", error);
    return NextResponse.json(
      { error: "Failed to update property. Please try again." },
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      include: {
        ownedBusiness: {
          include: {
            vtCredentials: true,
          },
        },
      },
    });

    // For delete properties, we still require BUSINESS_OWNER role
    if (user?.role !== "BUSINESS_OWNER") {
      return NextResponse.json(
        { error: "Only business owners can delete properties" },
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "No business found for this user" },
        { status: 404 }
      );
    }

    const property = await prisma.property.findUnique({ 
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    } 

    const propertyDelete = await prisma.property.delete({
      where: { id: params.id },
    });

    if (user.ownedBusiness && user.ownedBusiness.vtCredentials && property.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTPropertiesService.deleteProperties(property.vtId);
    }

    return NextResponse.json(propertyDelete);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
