import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import PropertyDetails from "@/components/User/PropertyDetails";

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
    <div className="px-5">
      <div className="mb-6">
        <h1 className="text-xl font-bold">{property.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Manage details and buildings for this property</p>
      </div>
      <PropertyDetails property={property} />
    </div>
  );
}