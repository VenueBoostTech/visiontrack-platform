// app/user/analytics/heatmaps/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import RetailHeatmaps from "@/components/User/Analytics/Retail/RetailHeatmaps";
import HeatmapContent from "@/components/User/Analytics/HeatmapContent";

export const metadata: Metadata = {
  title: "Heatmap Analytics - VisionTrack",
  description: "Analyze movement patterns and high-traffic areas",
};

export default async function HeatmapsPage() {
  const session = await getServerSession(authOptions);
  const businessType = session?.user?.business?.vt_use_scenario || 'RETAIL';

  return (
    <div className="px-5">
      {businessType === 'RETAIL' ? (
        <RetailHeatmaps />
      ) : (
        <HeatmapContent />
      )}
    </div>
  );
}