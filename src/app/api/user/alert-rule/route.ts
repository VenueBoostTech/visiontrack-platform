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

    const alertRules = await prisma.alertRule.findMany({
      include: {
        user: true,
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

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const alertRule = await prisma.alertRule.create({
      data: {
        name: data.name,
        description: data.description,
        severity: data.severity,
        enabled: data.enabled,
        conditions: data.conditions,
        actions: data.actions,
        userId: session.user.id,
      },
    });

    return NextResponse.json(alertRule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create alert rule" },
      { status: 500 }
    );
  }
}
