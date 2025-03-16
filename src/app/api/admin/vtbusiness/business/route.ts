// app/api/platform/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prismaDb";
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
  
    const businesses = await prisma.business.findMany({
        where: {
          vt_connected: false,
        },
        include: {
          owner: true,
          staff: {
            include: {
              user: true,
            },
          },
        },
      });

    return NextResponse.json(businesses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch business" },
      { status: 500 }
    );
  }
}
