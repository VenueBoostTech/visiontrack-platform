// app/user/analytics/traffic/page.tsx
import { Metadata } from "next";
import RetailConversionAnalytics from "@/components/User/Analytics/Retail/RetailTrafficAnalytics";

export const metadata: Metadata = {
  title: "Conversion Analytics - VisionTrack",
  description: "Analyze customer conversion patterns and trends",
};

export default function ConversionPage() {
  return (
    <div className="px-5">
      <RetailConversionAnalytics />
    </div>
  );
}