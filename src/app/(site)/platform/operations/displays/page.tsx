// app/platform/operations/analytics/page.tsx
import { Metadata } from "next";
import DisplayMonitoring from "@/components/Platform/Operations/DisplayMonitoring";

export const metadata: Metadata = {
  title: "Display Monitoring - VisionTrack",
  description: "Display monitoring and customer service",
};

export default function DisplayMonitoringPage() {
  return (
    <div className="px-0">
      <DisplayMonitoring />
    </div>
  );
}