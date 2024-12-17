import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the business where user is owner
    const business = await prisma.business.findFirst({
      where: {
        ownerId: session.user.id
      }
    });

    if (!business) {
      return new NextResponse("Business not found", { status: 404 });
    }

    return NextResponse.json(business);
    
  } catch (error) {
    console.error("[BUSINESS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}