// app/user/analytics/demographics/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import RetailDemographics from "@/components/User/Analytics/Retail/RetailDemographics";
import DemographicsContent from "@/components/User/Analytics/DemographicsContent";

export const metadata: Metadata = {
  title: "Demographics Analytics - VisionTrack",
  description: "Analyze visitor demographics and patterns",
};

export default async function AnalyticsDemographicsPage() {
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';

  return (
    <div className="px-5">
      {businessType === 'RETAIL' ? (
        <RetailDemographics />
      ) : (
        <DemographicsContent />
      )}
    </div>
  );
}