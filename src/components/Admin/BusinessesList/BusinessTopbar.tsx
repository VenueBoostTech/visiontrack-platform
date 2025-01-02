"use client";

import { Building2 } from "lucide-react";

export default function BusinessTopbar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          <Building2 className="inline-block mr-2 h-6 w-6" />
          Businesses
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage all registered businesses
        </p>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  );
}
