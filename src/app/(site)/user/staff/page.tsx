import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prismaDb";
import { authOptions } from "@/libs/auth";
import StaffContent from "@/components/User/Staff/StaffContent";

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
  return departments;
}

const StaffPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }

  // Get business owner
  const owner = await prisma.user.findFirst({
    where: { 
      id: session.user.id,
      role: "BUSINESS_OWNER"
    },
    include: {
      ownedBusiness: true,
    }
  });

  if (!owner?.ownedBusiness) {
    redirect('/dashboard');
  }

  // Get current staff members
  const currentStaff = await prisma.businessStaff.findMany({
    where: {
      businessId: owner.ownedBusiness.id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      },
      department: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const departmentList = await getDepartment();
  
  return (
    <div className="px-5">
      <StaffContent
        // @ts-ignore
        initialStaff={currentStaff} 
        businessId={owner.ownedBusiness.id}
        departmentList={departmentList}
        owner={owner}
      />
    </div>
  );
};

export default StaffPage;