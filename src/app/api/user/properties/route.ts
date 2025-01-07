import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from "zod";
import { VTPropertiesService } from "@/lib/vt-external-api/services/vt-properties.service";
import vtClient from "../../../../lib/vt-external-api/client";

const propertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["RESIDENTIAL", "COMMERCIAL", "MIXED", "RETAIL"]),
  address: z.string().min(1, "Address is required"),
});

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user with business relationships
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    // Get business ID based on role
    const businessId =
      user?.role === "BUSINESS_OWNER"
        ? user.ownedBusiness?.id
        : // @ts-ignore
          user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json([]);
    }

    const properties = await prisma.property.findMany({
      where: {
        businessId: businessId,
      },
      include: {
        buildings: {
          include: {
            zones: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try { 
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    // Get user with business relationships
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        ownedBusiness: {
          include: {
            vtCredentials: true,
          },
        },
        workingAt: {
          include: {
            business: true,
          },
        },
      },
    });

    // For creating properties, we still require BUSINESS_OWNER role
    if (user?.role !== "BUSINESS_OWNER") {
      return NextResponse.json(
        { error: "Only business owners can create properties" },
        { status: 403 }
      );
    }

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "No business found for this user" },
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

    let vtId = null;
    
    if (user.ownedBusiness.vtCredentials) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTPropertiesService.createProperties({
        name: validationResult.data.name,
        type: validationResult.data.type,
        address: validationResult.data.address,
      });
      vtId = response.id;
    }

    const property = await prisma.property.create({
      data: {
        ...validationResult.data,
        vtId: vtId,
        businessId: user.ownedBusiness.id,
      },
      include: {
        buildings: {
          include: {
            zones: true,
          },
        },
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Property creation error:", error);
    return NextResponse.json(
      { error: "Failed to create property. Please try again." },
      { status: 500 }
    );
  }
}
