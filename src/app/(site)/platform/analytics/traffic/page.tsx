// app/user/analytics/traffic/page.tsx
import { Metadata } from "next";
import RetailTrafficAnalytics from "@/components/User/Analytics/Retail/RetailTrafficAnalytics";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/auth";

export const metadata: Metadata = {
  title: "Traffic Analytics - VisionTrack",
  description: "Analyze customer traffic patterns and trends",
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

export default async function TrafficPage() {
  const { zones, owner } = await getBusinessAndZones();

  return (
    <div className="px-0">
      <RetailTrafficAnalytics zones={zones} user={owner} />
    </div>
  );
}