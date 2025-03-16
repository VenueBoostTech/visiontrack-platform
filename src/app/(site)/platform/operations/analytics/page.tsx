// app/user/operations/analytics/page.tsx
import { Metadata } from "next";
import StoreAnalytics from "@/components/User/Operations/StoreAnalytics";

export const metadata: Metadata = {
  title: "Store Analytics - VisionTrack",
  description: "Store operations and performance analytics",
};

export default function StoreAnalyticsPage() {
  return (
    <div className="px-0">
      <StoreAnalytics />
    </div>
  );
}