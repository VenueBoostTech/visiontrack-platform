// app/user/properties/page.tsx
import { Metadata } from "next";
import PropertiesContent from "@/components/User/PropertiesContent";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: `Properties - ${process.env.PLATFORM_NAME}`,
  description: `Manage your properties`,
};

async function getProperties() {
  const properties = await prisma.property.findMany({
    include: {
      buildings: true
    },
	orderBy: {
		createdAt: 'desc'
	}
  });
  
  return properties;
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="px-5">
      <PropertiesContent initialProperties={properties} />
    </div>
  );
}