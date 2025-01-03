"use client";

import BusinessListModalAction from "@/components/Common/Modals/BusinessListModalAction";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BusinessListTopbar() {
  const { refresh } = useRouter();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          <Building2 className="inline-block mr-2 h-6 w-6" />
          Manage VisionTrack Businesses
        </h2>
        <p className="text-sm text-muted-foreground">
          View and manage all registered businesses in the VisionTrack platform
          with their test and production statuses
        </p>
      </div>
      <BusinessListModalAction onSuccess={refresh} />
    </div>
  );
}