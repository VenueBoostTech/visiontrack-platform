// app/api/user/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import bcrypt from "bcrypt";
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import { prisma } from "@/libs/prismaDb";

export async function DELETE(
  request: Request,
  { params }: { params: { vtBusinessId: string, vt_platform_id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await VTSuperAdminService.deleteBusiness(params.vtBusinessId);
    await prisma.business.update({
      where: {
        id: params.vt_platform_id,
      },
      data: {
        vt_connected: false,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Business deletion error:", error);
    return NextResponse.json(
      { error: "Failed to remove vt business" },
      { status: 500 }
    );
  }
}
