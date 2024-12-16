// app/user/properties/zones/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ZonesContent from "@/components/User/Zones/ZonesContent";
import { prisma } from "@/libs/prismaDb";

export const metadata: Metadata = {
  title: `Zones Management - ${process.env.PLATFORM_NAME}`,
  description: `Manage building zones and security areas across properties`
};

async function getZones() {
  const zones = await prisma.zone.findMany({
    include: {
      building: {
        include: {
          property: true
        }
      },
      cameras: true
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