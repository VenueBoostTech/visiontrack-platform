import React from "react";
import { Metadata } from "next";
import LiveViewContent from "@/components/User/LiveMonitoring/LiveViewContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Monitoring Live - ${process.env.PLATFORM_NAME}`,
  description: `This is Monitoring Live page for ${process.env.PLATFORM_NAME}`,
  // other discriptions
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
          businessId: owner.ownedBusiness.id,
        },
      },
    },
    include: {
      zone: {
        include: {
          building: {
            include: {
              property: true,
            },
          },
          store: true,
        },
      },
      store: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return cameras;
}

const MonitoringLivePage = async () => {
  const cameras = await getCameras();

  return (
    <>
      <div className="px-5">
        <LiveViewContent cameras={cameras} />
      </div>
    </>
  );
};

export default MonitoringLivePage;
