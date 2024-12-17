// app/user/analytics/traffic/page.tsx
import { Metadata } from "next";
import RetailTrafficAnalytics from "@/components/User/Analytics/Retail/RetailTrafficAnalytics";

export const metadata: Metadata = {
  title: "Traffic Analytics - VisionTrack",
  description: "Analyze customer traffic patterns and trends",
};

export default function TrafficPage() {
  return (
    <div className="px-5">
      <RetailTrafficAnalytics />
    </div>
  );
}