console.log("Main VT credentials route loaded");

// app/api/user/vt-credentials/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import bcrypt from "bcrypt";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const owner = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        role: "BUSINESS_OWNER",
      },
      include: {
        ownedBusiness: true,
      },
    });

    if (!owner?.ownedBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // @ts-ignore
    const apiKeys = await prisma.vTApiCredential.findMany({
      where: {        businessId: owner.ownedBusiness.id,

      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error("[API_KEYS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const owner = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        role: "BUSINESS_OWNER",
      },
      include: {
        ownedBusiness: true,
      },
    });

    if (!owner?.ownedBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    const { name } = await req.json();

    const key = owner.role as string;

    // Hash the key
    const hashedKey = await bcrypt.hash(key, 10);
    
    // @ts-ignore
    const credential = await prisma.vTApiCredential.create({
      data: {
        name,
        api_key:hashedKey ,
        platform_id: owner.ownedBusiness.id,
        businessId: owner.ownedBusiness.id,
      },
    });

    return NextResponse.json(credential);
  } catch (error) {
    console.error("[VT_CREDENTIALS_POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

