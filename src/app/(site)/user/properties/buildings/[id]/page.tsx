// app/user/buildings/[id]/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import BuildingDetails from "@/components/User/Buildings/BuildingDetails";
import { prisma } from "@/libs/prismaDb";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const building = await prisma.building.findUnique({
    where: { id: params.id },
    include: { property: true }
  });

  return {
    title: `${building?.name || 'Building'} Details - ${process.env.PLATFORM_NAME}`,
    description: `Building details for ${building?.name} at ${building?.property.name}`
  };
}

export default function BuildingPage({ params }: { params: { id: string } }) {
  return (
    <div className="px-5">
      <BuildingDetails buildingId={params.id} />
    </div>
  );
}