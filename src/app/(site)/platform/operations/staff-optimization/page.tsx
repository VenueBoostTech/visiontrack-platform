// app/platform/operations/analytics/page.tsx
import { Metadata } from "next";
import StaffOptimization from "@/components/Platform/Operations/StaffOptimization";

export const metadata: Metadata = {
  title: "Staff Optimization - VisionTrack",
    description: "Staff optimization and customer service",
};

    export default function QueueManagementPage() {
  return (
    <div className="px-0">
      <StaffOptimization />
    </div>
  );
}