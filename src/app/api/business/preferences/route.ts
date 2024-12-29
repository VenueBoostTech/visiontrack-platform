// app/api/business/preferences/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's business
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: { business: true }
        }
      }
    });

    const businessId = user?.role === 'BUSINESS_OWNER' 
      ? user.ownedBusiness?.id
      // @ts-ignore
      : user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json({ error: "No business found" }, { status: 404 });
    }

    let preferences = await prisma.businessPreferences.findUnique({
      where: { businessId }
    });

    // Create default preferences if none exist
    if (!preferences) {
      preferences = await prisma.businessPreferences.create({
        data: {
          businessId,
          desktopNotifications: true,
          soundAlerts: false,
          minimumPriority: "all",
          businessHours: {
            start: "09:00",
            end: "17:00"
          },
          retentionDays: 30,
          createdBy: session.user.id,
          updatedBy: session.user.id
        }
      });
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Get preferences error:', error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's business
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: { business: true }
        }
      }
    });

    const businessId = user?.role === 'BUSINESS_OWNER' 
      ? user.ownedBusiness?.id
      : user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json({ error: "No business found" }, { status: 404 });
    }

    const data = await request.json();

    const preferences = await prisma.businessPreferences.upsert({
      where: { businessId },
      update: {
        desktopNotifications: data.desktopNotifications,
        soundAlerts: data.soundAlerts,
        minimumPriority: data.minimumPriority,
        businessHours: data.businessHours,
        retentionDays: data.retentionDays,
        updatedBy: session.user.id
      },
      create: {
        businessId,
        desktopNotifications: data.desktopNotifications,
        soundAlerts: data.soundAlerts,
        minimumPriority: data.minimumPriority,
        businessHours: data.businessHours,
        retentionDays: data.retentionDays,
        createdBy: session.user.id,
        updatedBy: session.user.id
      }
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Update preferences error:', error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 }
    );
  }
}