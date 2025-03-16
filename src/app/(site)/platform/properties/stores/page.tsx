import { Metadata } from "next";
import { prisma } from "@/libs/prismaDb";
import StoreContent from "@/components/User/Stores/StoreContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Properties Stores - ${process.env.PLATFORM_NAME}`,
  description: `Manage properties stores`,
};

async function getStores() {
  let stores: any = [];
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
      ownedBusiness: true,
    },
  });
  if (owner?.ownedBusiness) {
    stores = await prisma.store.findMany({
      where: {
        businessOwnerId: owner.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        brandManager: true,
        saleAssociate: true,
      },
    });
  }
  return stores;
}

async function getBusinessStaffs() {
  let staffList: any = [];
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
      ownedBusiness: true,
    },
  });

  if (owner?.ownedBusiness) {
    staffList = await prisma.businessStaff.findMany({
      where: {
        businessId: owner.ownedBusiness.id,
      },
      include: {
        department: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return staffList;
}

export default async function PropertiesStoresPage() {
  const stores = await getStores();
  const businessStaffs = await getBusinessStaffs();
  return (
    <div className="px-5">
      <StoreContent initialStores={stores} businessStaffs={businessStaffs} />
    </div>
  );
}
