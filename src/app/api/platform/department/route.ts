// app/api/platform/department/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        ownedBusiness: true,
      },
    });

    if (!user || user.role !== "BUSINESS_OWNER" || !user.ownedBusiness) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // craete new department
    const department = await prisma.department.create({
      data: {
        name,
        businessId: user.ownedBusiness.id,
      },
      include: {
        business: true,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
