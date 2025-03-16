// app/api/user/zones/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from "zod";
import vtClient from "../../../../lib/vt-external-api/client";
import { VTBuildingService } from "@/lib/vt-external-api/services/vt-building.service";
import { VTZoneService } from "@/lib/vt-external-api/services/vt-zone.service";

const zoneSchema = z.object({
  name: z.string().min(1, "Name is required"),
  propertyId: z.string(),
  buildingId: z.string(),
  type: z.string(),
  floor: z.union([z.number(), z.null()]).optional(),
  storeId: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's business
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { ownedBusiness: true },
    });

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    const zones = await prisma.zone.findMany({
      where: {
        property: {
          businessId: user.ownedBusiness.id,
        },
      },
      include: {
        property: true,
        building: {
          include: {
            property: true,
          },
        },
        store: true,
        cameras: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(zones);
  } catch (error) {
    console.error("Zones GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch zones" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    // For creating zone, we still require BUSINESS_OWNER role
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
    const validationResult = zoneSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const building = await prisma.building.findFirst({
      where: {
        id: data.buildingId,
        property: {
          businessId: user.ownedBusiness.id,
        },
      },
      include: { property: true },
    });

    if (!building) {
      return NextResponse.json(
        { error: "Building not found" },
        { status: 404 }
      );
    }

    const property = await prisma.property.findFirst({
      where: {
        id: data.propertyId,
        businessId: user.ownedBusiness.id,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const zoneData = {
      name: data.name,
      type: data.type,
      floor: data.floor,
      buildingId: data.buildingId,
      propertyId: building.propertyId,
      ...(data.type === "RETAIL" && data.storeId
        ? { storeId: data.storeId }
        : {}),
    };

    let vtId = null;
    if (user.ownedBusiness.vtCredentials) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTZoneService.createZone({
        property_id: property.vtId,
        building_id: building.vtId,
        name: validationResult.data.name,
        type: validationResult.data.type,
        ...(validationResult.data.floor ? { floor_number: validationResult.data.floor } : {})
      });
      vtId = response.id;
    }

    const zone = await prisma.zone.create({
      data: {
        ...zoneData,
        vtId: vtId,
        businessId: user.ownedBusiness.id,
      },
      include: {
        property: true,
        building: {
          include: {
            property: true,
          },
        },
        store: true,
        cameras: true,
      },
    });

    return NextResponse.json(zone);
  } catch (error) {
    console.error("Zone creation error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create zone",
      },
      { status: 500 }
    );
  }
}
