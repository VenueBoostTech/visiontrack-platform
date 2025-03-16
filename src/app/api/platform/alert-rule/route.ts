// app/api/user/alert-rule/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const businessId =
      user?.role === "BUSINESS_OWNER"
        ? user.ownedBusiness?.id
        : // @ts-ignore
          user.workingAt?.businessId;

    if (!businessId) {
      return NextResponse.json([]);
    }

    const alertRules = await prisma.alertRule.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          // @ts-ignore
          { businessId: businessId },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(alertRules);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch alert rules" },
      { status: 500 }
    );
  }
}

// app/api/user/alert-rule/route.ts
export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    // Get user with both ownedBusiness and workingAt
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get business ID based on role
    const businessId =
      user.role === "BUSINESS_OWNER"
        ? user.ownedBusiness?.id
        : user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json({ error: "No business found" }, { status: 404 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.severity) {
      return NextResponse.json(
        { error: "Name and severity are required" },
        { status: 400 }
      );
    }

    // Convert conditions to an array of strings
    const conditions = data.conditions || [];

    // Create the alert rule with conditions as string array
    const alertRule = await prisma.alertRule.create({
      data: {
        name: data.name,
        description: data.description || "",
        severity: data.severity,
        enabled: data.enabled ?? true,
        conditions, // Now it's an array of strings
        actions: data.actions || [],
        userId: session.user.id,
        businessId: businessId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Convert conditions back to objects in the response
    const responseRule = {
      ...alertRule,
      conditions: alertRule.conditions.map((c) => JSON.parse(c)),
    };

    return NextResponse.json(responseRule);
  } catch (error) {
    console.error("Create alert rule error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create alert rule",
      },
      { status: 500 }
    );
  }
}
