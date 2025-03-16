// app/user/properties/cameras/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prismaDb";
import CamerasContent from "@/components/Platform/Cameras/CamerasContent";

export const metadata: Metadata = {
  title: `Cameras Management - ${process.env.PLATFORM_NAME}`,
  description: `Manage and monitor all security cameras across properties`
};

async function getCameras() {
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

  // Get cameras for zones in properties belonging to this business
  const cameras = await prisma.camera.findMany({
    where: {
      zone: {
        property: {
          businessId: owner.ownedBusiness.id
        }
      }
    },
    include: {
      zone: {
        include: {
          building: {
            include: {
              property: true
            }
          },
          store: true
        }
      },
      store: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return cameras;
}

export default async function PropertiesCamerasPage() {
  const cameras = await getCameras();

  return (
    <div className="px-0">
      <CamerasContent initialCameras={cameras} />
    </div>
  );
}