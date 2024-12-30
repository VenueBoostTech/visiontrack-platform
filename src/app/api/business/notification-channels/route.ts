// app/api/business/notification-channels/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

const defaultChannels = [
  {
    type: "email",
    name: "Email Notifications",
    description: "Send alerts to specified email addresses",
    config: { emails: [] }
  },
  {
    type: "sms",
    name: "SMS Alerts",
    description: "Send alerts via SMS to security personnel",
    config: { phone_numbers: [] }
  }
];

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
      include: { ownedBusiness: true, workingAt: { include: { business: true } } }
    });

    const businessId = user?.role === 'BUSINESS_OWNER' 
      ? user.ownedBusiness?.id
      : user.workingAt?.business?.id;

    if (!businessId) return NextResponse.json({ error: "No business found" }, { status: 404 });

    let channels = await prisma.notificationChannel.findMany({ where: { businessId } });

    // Create default channels if none exist
    if (channels.length === 0) {
      channels = await Promise.all(defaultChannels.map(channel => 
        prisma.notificationChannel.create({
          data: {
            ...channel,
            businessId,
            enabled: false,
            createdBy: session.user.id,
            updatedBy: session.user.id
          }
        })
      ));
    }

    return NextResponse.json(channels);
  } catch (error) {
    console.error('Get channels error:', error);
    return NextResponse.json({ error: "Failed to fetch channels" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();

    // Get business ID
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
      include: { ownedBusiness: true, workingAt: { include: { business: true } } }
    });

    const businessId = user?.role === 'BUSINESS_OWNER' 
      ? user.ownedBusiness?.id
      : user.workingAt?.business?.id;

    if (!businessId) return NextResponse.json({ error: "No business found" }, { status: 404 });

    // If toggling enabled state
    if (data.enabled !== undefined) {
      const { id, enabled } = data;
      if (!id) return NextResponse.json({ error: "Channel ID required" }, { status: 400 });

      const channel = await prisma.notificationChannel.findFirst({
        where: { id, businessId }
      });

      if (!channel) {
        return NextResponse.json({ error: "Channel not found" }, { status: 404 });
      }

      const updatedChannel = await prisma.notificationChannel.update({
        where: { id },
        data: { enabled, updatedBy: session.user.id }
      });

      return NextResponse.json(updatedChannel);
    }

    // If updating configuration
    if (data.config) {
      const { id, config } = data;
      if (!id) return NextResponse.json({ error: "Channel ID required" }, { status: 400 });

      const channel = await prisma.notificationChannel.findFirst({
        where: { id, businessId }
      });

      if (!channel) {
        return NextResponse.json({ error: "Channel not found" }, { status: 404 });
      }

      const updatedConfig = {
        emails: config.emails || [],
        phone_numbers: config.phone_numbers || []
      };

      const updatedChannel = await prisma.notificationChannel.update({
        where: { id },
        data: {
          config: updatedConfig,
          updatedBy: session.user.id
        }
      });

      return NextResponse.json(updatedChannel);
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error('Update channel error:', error);
    return NextResponse.json({ error: "Failed to update channel" }, { status: 500 });
  }
}