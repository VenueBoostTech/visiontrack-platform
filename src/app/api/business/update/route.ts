import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, address, vt_use_scenario } = body;

    // First get the business where user is owner
    const business = await prisma.business.findFirst({
      where: {
        ownerId: session.user.id
      }
    });

    if (!business) {
      return new NextResponse("Business not found", { status: 404 });
    }

    // Update business details
    const updatedBusiness = await prisma.business.update({
      where: {
        id: business.id
      },
      data: {
        name,
        email,
        phone,
        address,
        // @ts-ignore
        vt_use_scenario: vt_use_scenario
      }
    });

    return NextResponse.json(updatedBusiness);
  } catch (error) {
    console.error("[BUSINESS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}