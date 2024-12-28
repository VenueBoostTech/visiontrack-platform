// app/api/user/alert-rule/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function PUT(
  request: Request,
  { params }: { params: { Id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { id, ...update} = data;
    const alertRule = await prisma.alertRule.update({
      where: {
        id: params.Id,
      },
      data: {
        ...update,
        userId: session.user.id,
      },
    });

    return NextResponse.json(alertRule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update alert rule" },
      { status: 500 }
    );
  }
}
