// app/api/user/business/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismaDb";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const owner = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      role: "BUSINESS_OWNER", 
    },
    include: {
      ownedBusiness: {
        include: {
          vtCredentials: true
        }
      }
    }
  });

  return NextResponse.json(owner);
}