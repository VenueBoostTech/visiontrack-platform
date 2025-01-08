// app/api/user/buildings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from "zod";

import vtClient from "../../../../lib/vt-external-api/client";
import { VTBuildingService } from "@/lib/vt-external-api/services/vt-building.service";

const buildingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  propertyId: z.string().min(1, "Property id is required"),
  floorCount: z.number().min(1, "Total floor is required"),
  belowGroundFloors: z.number().min(1, "Ground floor is required"),
});

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

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

    // For creating buildings, we still require BUSINESS_OWNER role
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

    // Validate input data
    const validationResult = buildingSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const property = await prisma.property.findFirst({
      where: {
        id: validationResult.data.propertyId
      }
    })

    if (!property) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 }
      );
    }
    let vtId = null;
    if (user.ownedBusiness.vtCredentials && property.vtId) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTBuildingService.createBuilding({
        name: validationResult.data.name,
        property_id: property.vtId,
        below_ground_floor: validationResult.data.belowGroundFloors,
        total_floors: validationResult.data.floorCount,
      });
      vtId = response.id;
    }

    const building = await prisma.building.create({
      data: {
        ...data,
        vtId: vtId,
        businessId: user.ownedBusiness.id,
      },
      include: {
        property: true,
        zones: true,
      },
    });

    return NextResponse.json(building);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create building" },
      { status: 500 }
    );
  }
}
