import { Metadata } from "next";
import { prisma } from "@/libs/prismaDb";
import ZonesContent from "@/components/User/Zones/ZonesContent";
import StoreContent from "@/components/User/Stores/StoreContent";

export const metadata: Metadata = {
  title: `Properties Stores - ${process.env.PLATFORM_NAME}`,
  description: `Manage properties stores`,
};

async function getZones() {
  const stores = await prisma.zone.findMany({
    include: {
      building: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return stores;
}

export default async function PropertiesStoresPage() {
    const stores = await getZones();

  return (
    <div className="px-5">
      <StoreContent initialStores={stores} />
    </div>
  );
}