// app/user/properties/buildings/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prismaDb";
import BuildingsContent from "@/components/User/BuildingsContent";

export const metadata: Metadata = {
  title: `Properties Buildings - ${process.env.PLATFORM_NAME}`,
  description: `Manage properties buildings`,
};

async function getBuildings() {
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

  // Get buildings for properties belonging to this business
  const buildings = await prisma.building.findMany({
    where: {
      property: {
        businessId: owner.ownedBusiness.id
      }
    },
    include: {
      property: true,
      zones: true // Include zones to count them
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return buildings;
}

export default async function PropertiesBuildingsPage() {
  const buildings = await getBuildings();

  return (
    <div className="px-5">
      <BuildingsContent initialBuildings={buildings} />
    </div>
  );
}