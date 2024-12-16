// app/user/properties/cameras/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import CamerasContent from "@/components/User/Cameras/CamerasContent";
import { prisma } from "@/libs/prismaDb";

export const metadata: Metadata = {
  title: `Cameras Management - ${process.env.PLATFORM_NAME}`,
  description: `Manage and monitor all security cameras across properties`
};

async function getCameras() {
  const cameras = await prisma.camera.findMany({
    include: {
      zone: {
        include: {
          building: {
            include: {
              property: true
            }
          }
        }
      }
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
    <div className="px-5">
      {/* @ts-ignore */}
      <CamerasContent initialCameras={cameras} />
    </div>
  );
}