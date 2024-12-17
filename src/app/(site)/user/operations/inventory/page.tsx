// app/user/operations/analytics/page.tsx
import { Metadata } from "next";
import InventoryTracking from "@/components/User/Operations/InventoryTracking";

export const metadata: Metadata = {
  title: "Inventory Tracking - VisionTrack",
  description: "Inventory tracking and management",
};

export default function InventoryTrackingPage() {
  return (
    <div className="px-5">
      <InventoryTracking />
    </div>
  );
}