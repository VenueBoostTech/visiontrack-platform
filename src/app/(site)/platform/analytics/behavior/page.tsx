// app/user/analytics/traffic/page.tsx
import RetailConversionAnalytics from "@/components/User/Analytics/Retail/RetailConversionAnalytics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversion Analytics - VisionTrack",
  description: "Analyze customer conversion patterns and trends",
};

export default function ConversionPage() {
  return (
    <div className="px-0">
      <RetailConversionAnalytics />
    </div>
  );
}