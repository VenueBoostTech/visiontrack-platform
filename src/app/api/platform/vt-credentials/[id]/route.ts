// app/api/user/vt-credentials/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log('params.id', params.id);
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
    const credential = await prisma.vTApiCredential.delete({
      where: {
        id: params.id,
        businessId: owner.ownedBusiness.id,
      },
    });

    return NextResponse.json(credential);
  } catch (error) {
    console.error("[VT_CREDENTIALS_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}