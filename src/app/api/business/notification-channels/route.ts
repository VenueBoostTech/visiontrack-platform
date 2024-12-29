import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { id, enabled, config } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Channel ID is required" },
        { status: 400 }
      );
    }

    // Get user's business ID for verification
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

    // Verify channel belongs to user's business
    // @ts-ignore
    const existingChannel = await prisma.notificationChannel.findFirst({
      where: {
        id,
        businessId
      }
    });

    if (!existingChannel) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    // Ensure config has emails and phone_numbers initialized
    const updatedConfig = {
      emails: config.emails || [],
      phone_numbers: config.phone_numbers || [],
    };

    const channel = await prisma.notificationChannel.update({
      where: { id },
      data: {
        enabled: enabled !== undefined ? enabled : undefined,
        config: updatedConfig,
        updatedBy: session.user.id
      }
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.error('Update channel error:', error);
    return NextResponse.json(
      { error: "Failed to update notification channel" },
      { status: 500 }
    );
  }
}
