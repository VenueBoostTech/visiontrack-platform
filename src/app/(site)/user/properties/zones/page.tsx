import { Metadata } from "next";
import { prisma } from "@/libs/prismaDb";
import ZonesContent from "@/components/User/Zones/ZonesContent";

export const metadata: Metadata = {
  title: `Properties Zones - ${process.env.PLATFORM_NAME}`,
  description: `Manage properties zones`,
};

async function getZones() {
  const zones = await prisma.zone.findMany({
    include: {
      building: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return zones;
}

export default async function PropertiesZonesPage() {
    const zones = await getZones();

  return (
    <div className="px-5">
      <ZonesContent initialZones={zones} />
    </div>
  );
}