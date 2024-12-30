// app/api/business/route.ts
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { supabase } from "@/lib/supabase";

// export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

export async function POST(req: Request) {
  try {
    const { business, owner } = await req.json();

    // Create owner user
    const hashedPassword = await hash(owner.password, 12);
    const newOwner = await prisma.user.create({
      data: {
        name: owner.name,
        email: owner.email,
        password: hashedPassword,
        role: "BUSINESS_OWNER",
        emailVerified: new Date(),
      },
    });

    // Create business
    const newBusiness = await prisma.business.create({
      data: {
        name: business.name,
        email: business.email,
        phone: business.phone,
        address: business.address,
        vt_use_scenario: business.vt_use_scenario,
        ownerId: newOwner.id,
      },
      include: {
        owner: true,
      },
    });

    // Sync to Supabase
    try {
      await supabase.auth.admin.createUser({
        email: owner.email,
        password: owner.password,
        email_confirm: true,
        user_metadata: {  // Changed from options to user_metadata
          platforms: ['visiontrack']
        }
      });
    } catch (supabaseError) {
      console.log('Supabase sync failed:', supabaseError);
    }

    return NextResponse.json({ business: newBusiness }, { status: 201 });
  } catch (error) {
    console.error("[BUSINESS_POST]", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}