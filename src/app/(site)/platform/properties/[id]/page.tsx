import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import PropertyDetails from "@/components/Platform/PropertyDetails";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Property Details",
  description: "View property details and buildings",
};

async function getProperty(id: string) {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      buildings: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });
  
  if (!property) {
    throw new Error('Property not found');
  }
  
  return property;
}

export default async function PropertyPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const property = await getProperty(params.id);

  return (
    <div className="px-0">
      <div className="mb-6">
      <h2 className="text-2xl text-gray-700 font-bold">{property.name}</h2>
        <p className="text-gray-700 mt-1">Manage details and buildings for this property</p>
      </div>
      <PropertyDetails property={property} />
    </div>
  );
}