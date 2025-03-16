// app/user/properties/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prismaDb";
import PropertiesContent from "@/components/Platform/PropertiesContent";

export const metadata: Metadata = {
  title: `Properties - ${process.env.PLATFORM_NAME}`,
  description: `Manage your properties`,
};

async function getProperties() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  // Get business owner and their business
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
    return [];
  }

  // Get properties for this specific business
  const properties = await prisma.property.findMany({
    where: {
      businessId: owner.ownedBusiness.id,
    },
    include: {
      buildings: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return properties;
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="px-0">
      <PropertiesContent initialProperties={properties} />
    </div>
  );
}