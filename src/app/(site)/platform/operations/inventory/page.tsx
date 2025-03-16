// app/platform/operations/analytics/page.tsx
import { Metadata } from "next";
import InventoryTracking from "@/components/Platform/Operations/InventoryTracking";

export const metadata: Metadata = {
  title: "Inventory Tracking - VisionTrack",
  description: "Inventory tracking and management",
};

export default function InventoryTrackingPage() {
  return (
    <div className="px-0">
      <InventoryTracking />
    </div>
  );
}