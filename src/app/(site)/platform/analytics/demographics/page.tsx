// app/user/analytics/demographics/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import RetailDemographics from "@/components/User/Analytics/Retail/RetailDemographics";
import DemographicsContent from "@/components/User/Analytics/DemographicsContent";
import { prisma } from "@/libs/prismaDb";
export const metadata: Metadata = {
  title: "Demographics Analytics - VisionTrack",
  description: "Analyze visitor demographics and patterns",
};

async function getBusinessAndZones() {
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
      ownedBusiness: {
        include: {
          vtCredentials: true,
        },
      },
    },
  });

  let zones: any[] = [];
  if (owner?.ownedBusiness) {
    zones = await prisma.zone.findMany({
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
  }

  return { zones, owner };
}

export default async function AnalyticsDemographicsPage() {
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';

  const { zones, owner } = await getBusinessAndZones();

  return (
    <div className="px-0">
      {businessType === 'RETAIL' ? (
        <RetailDemographics zones={zones} user={owner} />
      ) : (
        <DemographicsContent zones={zones} user={owner} />
      )}
    </div>
  );
}