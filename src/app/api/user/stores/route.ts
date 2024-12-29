// app/api/user/stores/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user with business relationships
    const user = await prisma.user.findFirst({
      where: { 
        id: session.user.id 
      },
      include: {
        ownedBusiness: true,
        workingAt: {
          include: {
            business: true
          }
        }
      }
    });

    // Get business ID based on role
    const businessId = user?.role === 'BUSINESS_OWNER' 
      ? user.ownedBusiness?.id
      // @ts-ignore 
      : user.workingAt?.business?.id;

    if (!businessId) {
      return NextResponse.json([]);
    }

    const stores = await prisma.store.findMany({
      where: {
        // @ts-ignore
        businessOwnerId: user.role === 'BUSINESS_OWNER' ? user.id : undefined
      },
      include: {
        cameras: true,
        zones: true,
        brandManager: true,
        saleAssociate: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stores" },
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

    // Verify user is a business owner
    const user = await prisma.user.findFirst({
      where: { 
        id: session.user.id,
        role: 'BUSINESS_OWNER'
      },
      include: {
        ownedBusiness: true
      }
    });

    if (!user?.ownedBusiness) {
      return NextResponse.json(
        { error: "Only business owners can create stores" },
        { status: 403 }
      );
    }

    const data = await request.json();

    const store = await prisma.store.create({
      data: {
        name: data.name,
        businessOwnerId: user.id,
        brandManagerId: data.brandManagerId,
        saleAssociateId: data.saleAssociateId
      },
      include: {
        cameras: true,
        zones: true,
        brandManager: true,
        saleAssociate: true,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("Create store error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create store",
      },
      { status: 500 }
    );
  }
}