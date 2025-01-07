// app/api/user/zones/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";
import { z } from "zod";
import vtClient from "../../../../lib/vt-external-api/client";
import { VTBuildingService } from "@/lib/vt-external-api/services/vt-building.service";
import { VTZineService } from "@/lib/vt-external-api/services/vt-zone.service";

const zoneSchema = z.object({
  name: z.string().min(1, "Name is required"),
  propertyId: z.string(),
  buildingId: z.string(),
  type: z.string(),
  floor: z.string(),
  storeId: z.string(),
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

    // Validate input data
    const validationResult = zoneSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
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

    if (user.ownedBusiness.vtCredentials) {
      vtClient.setCredentials({
        platform_id: user.ownedBusiness.vtCredentials.businessId,
        api_key: user.ownedBusiness.vtCredentials.api_key,
        business_id: user.ownedBusiness.vtCredentials.platform_id,
      });

      const response: any = await VTZineService.createZone({
        property_id: validationResult.data.propertyId,
        building_id: validationResult.data.buildingId,
        name: validationResult.data.name,
        type: validationResult.data.type,
        floor: validationResult.data.floor,
        store_id: validationResult.data.storeId,
      });
    }

    const zone = await prisma.zone.create({
      data: zoneData,
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
