import { Metadata } from "next";
import DepartmentContent from "@/components/User/Department/DepartmentContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const metadata: Metadata = {
  title: `Department - ${process.env.PLATFORM_NAME}`,
  description: `Manage Department`,
};

async function getDepartment() {
  let departments: any = [];
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  // Get business owner
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
  if (owner?.ownedBusiness) {
    departments = await prisma.department?.findMany({
      where: {
        businessId: owner.ownedBusiness.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        business: true,
      },
    });
  }
  
  return departments
}

export default async function DepartmentPage() {
  const department = await getDepartment();

  return (
    <div className="px-5">
      <DepartmentContent initialDepartment={department} />
    </div>
  );
}
