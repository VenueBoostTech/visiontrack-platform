// app/api/user/zones/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getAuthSession } from "@/libs/auth";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const store = await prisma.store.findMany({
      include: {
        cameras: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch store" },
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

    const data  = await request.json();

    const store = await prisma.store.create({
      data: data,
      include: {
        cameras: true,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create store",
      },
      { status: 500 }
    );
  }
}
