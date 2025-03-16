// app/platform/operations/analytics/page.tsx
import { Metadata } from "next";
import QueueManagement from "@/components/Platform/Operations/QueueManagement";

export const metadata: Metadata = {
  title: "Queue Management - VisionTrack",
  description: "Queue management and customer service",
};

export default function QueueManagementPage() {
  return (
    <div className="px-0">
      <QueueManagement />
    </div>
  );
}