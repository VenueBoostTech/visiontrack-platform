// app/user/operations/analytics/page.tsx
import { Metadata } from "next";
import DisplayMonitoring from "@/components/User/Operations/DisplayMonitoring";

export const metadata: Metadata = {
  title: "Display Monitoring - VisionTrack",
  description: "Display monitoring and customer service",
};

export default function DisplayMonitoringPage() {
  return (
    <div className="px-5">
      <DisplayMonitoring />
    </div>
  );
}