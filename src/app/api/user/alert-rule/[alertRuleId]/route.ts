// app/api/user/alert-rule/[alertRuleId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";


export async function PUT(
  request: Request,
  { params }: { params: { alertRuleId: string } }
) {
  if (!params.alertRuleId) {
    return new NextResponse("Alert rule ID is required", { status: 400 });
  }

  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    
    // Get user's business ID
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

    // Verify rule belongs to user's business
    const existingRule = await prisma.alertRule.findFirst({
      where: {
        id: params.alertRuleId,
        businessId: businessId
      }
    });

    if (!existingRule) {
      return new NextResponse("Rule not found", { status: 404 });
    }

    // Convert new conditions to string array if provided
    const conditions = data.conditions 
      ? data.conditions.map((c: any) => JSON.stringify(c))
      : existingRule.conditions;

    const alertRule = await prisma.alertRule.update({
      where: { 
        id: params.alertRuleId
      },
      data: {
        name: data.name ?? existingRule.name,
        description: data.description ?? existingRule.description,
        severity: data.severity ?? existingRule.severity,
        enabled: data.enabled !== undefined ? data.enabled : existingRule.enabled,
        conditions,
        actions: data.actions ?? existingRule.actions,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        }
      }
    });

    // Convert conditions back to objects in response
    const responseRule = {
      ...alertRule,
      conditions: alertRule.conditions.map(c => JSON.parse(c))
    };

    return NextResponse.json(responseRule);
  } catch (error) {
    console.error('Rule update error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to update alert rule", 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { alertRuleId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const alertRuleId = params.alertRuleId;
    if (!alertRuleId) {
      return new NextResponse("Alert rule ID is required", { status: 400 });
    }

    // Get user's business ID
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
      return new NextResponse("Business not found", { status: 404 });
    }

    // Verify rule belongs to user's business
    const existingRule = await prisma.alertRule.findFirst({
      where: {
        id: alertRuleId,
        businessId: businessId
      }
    });

    if (!existingRule) {
      return new NextResponse("Rule not found", { status: 404 });
    }

    await prisma.alertRule.delete({
      where: { id: alertRuleId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Rule deletion error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to delete alert rule", 
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { alertRuleId: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const alertRuleId = params.alertRuleId;
    if (!alertRuleId) {
      return new NextResponse("Alert rule ID is required", { status: 400 });
    }

    const alertRule = await prisma.alertRule.findUnique({
      where: { id: alertRuleId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!alertRule) {
      return new NextResponse("Alert rule not found", { status: 404 });
    }

    return NextResponse.json(alertRule);
  } catch (error) {
    console.error('Rule fetch error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to fetch alert rule", 
      { status: 500 }
    );
  }
}