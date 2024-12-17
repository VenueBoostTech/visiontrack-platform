// app/user/operations/analytics/page.tsx
import { Metadata } from "next";
import QueueManagement from "@/components/User/Operations/QueueManagement";

export const metadata: Metadata = {
  title: "Queue Management - VisionTrack",
  description: "Queue management and customer service",
};

export default function QueueManagementPage() {
  return (
    <div className="px-5">
      <QueueManagement />
    </div>
  );
}