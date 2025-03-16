// app/api/department/[departmentId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

export async function PUT(
  request: Request,
  { params }: { params: { Id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

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
      return NextResponse.json(
        { error: "Only business owners can update department" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // update the department
    const department = await prisma.department.update({
      where: {
        id: params.Id,
        businessId: owner.ownedBusiness.id,
      },
      data: {
        name: data.name,
      },
      include: {
        business: true,
      },
    });

    if (!department) {
      return NextResponse.json(
        { error: "Failed to update department" },
        { status: 500 }
      );
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error("Staff update error:", error);
    return NextResponse.json(
      { error: "Failed to update department" },
      { status: 500 }
    );
  }
}

// Delete staff member
export async function DELETE(
  req: Request,
  { params }: { params: { Id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { Id } = params;
    if (!Id) {
      return new NextResponse("Department ID required", { status: 400 });
    }

    // Get staff member and verify business owner
    const owner = await prisma.user.findFirst({
      where: {
        id: session.user.id,
        role: "BUSINESS_OWNER",
      },
      include: {
        ownedBusiness: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!owner?.ownedBusiness) {
      return NextResponse.json(
        { error: "Only business owners can delete department" },
        { status: 403 }
      );
    }

    // Delete business staff relationship
    await prisma.department.delete({
      where: { id: Id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
