"use client";

import { Input } from "@/components/ui/input";
import { Building2, Search, ExternalLink, Filter, Download, ChevronLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import BusinessListModalAction from "@/components/Common/Modals/BusinessListModalAction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import InputSelect from "@/components/Common/InputSelect";

export default function BusinessListTopbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, back } = useRouter();
  const [filterStatus, setFilterStatus] = useState<string | null>(
    searchParams.get("status") || null
  );
  
  const refresh = () => window.location.reload();
  
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value === "Select Option" ? null : e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (status) {
      params.set("status", status);
      setFilterStatus(status);
    } else {
      params.delete("status");
      setFilterStatus(null);
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  // Get current filter status from URL
  const currentStatus = searchParams.get("status") || "Select Option";
  const currentSearch = searchParams.get("search");

  // Define options for the InputSelect
  const filterOptions = [
    { value: "Select Option", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "LocalTest", label: "Local Test" },
    { value: "ProdTest", label: "Production Test" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => back()}
            className="hover:text-primary"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight flex items-center text-gray-800 dark:text-white">
              <Building2 className="inline-block mr-2 h-6 w-6 text-primary" />
              VisionTrack Businesses
            </h2>
            <p className="text-sm text-muted-foreground">
              View and manage all registered businesses in the VisionTrack platform with their test and production statuses
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 min-w-[300px]">
          {/* Inputs in the first row */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search VT businesses..."
                defaultValue={currentSearch || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 w-full border-gray-200 dark:border-gray-700"
              />
            </div>
            
            {/* Status Filter */}
            <div className="w-[180px]">
              <InputSelect
                name="businessStatus"
                label=""
                options={filterOptions}
                onChange={handleFilter}
                value={currentStatus}
              />
            </div>
          </div>
          
          {/* Buttons in the second row */}
          <div className="flex flex-wrap gap-3 justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            
            <Link
              href="/admin/businesses"
              className="inline-flex items-center gap-2 px-4 h-9 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Businesses</span>
              <span className="sm:hidden">Businesses</span>
            </Link>
            
            <BusinessListModalAction onSuccess={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
}