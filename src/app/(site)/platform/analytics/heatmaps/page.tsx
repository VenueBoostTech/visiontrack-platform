// app/user/analytics/heatmaps/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import RetailHeatmaps from "@/components/User/Analytics/Retail/RetailHeatmaps";
import HeatmapContent from "@/components/User/Analytics/HeatmapContent";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prismaDb";
export const metadata: Metadata = {
  title: "Heatmap Analytics - VisionTrack",
  description: "Analyze movement patterns and high-traffic areas",
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


export default async function HeatmapsPage() {
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';
  const { zones, owner } = await getBusinessAndZones();

  return (
    <div className="px-5">
      {businessType === 'RETAIL' ? (
        <RetailHeatmaps zones={zones} user={owner} />
      ) : (
        <HeatmapContent zones={zones} user={owner} />
      )}
    </div>
  );
}