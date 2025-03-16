// app/user/operations/analytics/page.tsx
import { Metadata } from "next";
import StaffOptimization from "@/components/User/Operations/StaffOptimization";

export const metadata: Metadata = {
  title: "Staff Optimization - VisionTrack",
    description: "Staff optimization and customer service",
};

    export default function QueueManagementPage() {
  return (
    <div className="px-5">
      <StaffOptimization />
    </div>
  );
}