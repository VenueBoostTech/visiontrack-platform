import { Metadata } from "next";
import BuildingsContent from "@/components/User/BuildingsContent";
import { prisma } from "@/libs/prismaDb";

export const metadata: Metadata = {
  title: `Properties Buildings - ${process.env.PLATFORM_NAME}`,
  description: `Manage properties buildings`,
};

async function getBuildings() {
  const buildings = await prisma.building.findMany({
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