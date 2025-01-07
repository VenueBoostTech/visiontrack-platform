// app/api/user/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import bcrypt from "bcrypt";
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import { prisma } from "@/libs/prismaDb";
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data: any = await req.json();
    const key = data.role as string;
    const hashedKey = await bcrypt.hash(key, 10);
    
    const response: any = await VTSuperAdminService.createBusiness({
      name: data.name,
      is_active: data.is_active,
      is_local_test: data.is_local_test,
      is_prod_test: data.is_prod_test,
      vt_platform_id: data.vt_platform_id,
      api_key: hashedKey,
    });

    await prisma.business.update({
      where: {
        id: data.vt_platform_id,
      },
      data: {
        vt_connected: true,
      },
    });

    await prisma.vTApiCredential.create({
      data:{
        platform_id: response.id,
        name: data.name,
        businessId: data.vt_platform_id,
        api_key: hashedKey
      }
    })

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}
