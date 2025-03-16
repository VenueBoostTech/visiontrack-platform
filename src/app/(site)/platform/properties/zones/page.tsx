import { Metadata } from "next";
import { prisma } from "@/libs/prismaDb";
import ZonesContent from "@/components/Platform/Zones/ZonesContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Properties Zones - ${process.env.PLATFORM_NAME}`,
  description: `Manage properties zones`,
};


async function getZones() {

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
  const zones = await prisma.zone.findMany({
    where: {
      property: {
        businessId: owner.ownedBusiness.id
      }
    },
    include: {
      property: true,
      building: {
        include: {
          property: true
        }
      },
      store: true,
      cameras: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return zones;
}
}

export default async function PropertiesZonesPage() {
    const zones = await getZones();

  return (
    <div className="px-0">
       {/* @ts-ignore */}
      <ZonesContent initialZones={zones} />
    </div>
  );
}