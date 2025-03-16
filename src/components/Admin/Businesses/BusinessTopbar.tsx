"use client";

import { Input } from "@/components/ui/input";
import { Building2, Search, ExternalLink, Filter, Download, SortAsc } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import BusinessModalAction from "@/components/Common/Modals/BusinessModalAction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function BusinessTopbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filterType, setFilterType] = useState<string | null>(null);
  
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

  const handleFilter = (type: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set("type", type);
      setFilterType(type);
    } else {
      params.delete("type");
      setFilterType(null);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Get current filter type from URL
  const currentType = searchParams.get("type");
  const currentSearch = searchParams.get("search");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight flex items-center text-gray-800 dark:text-white">
            <Building2 className="inline-block mr-2 h-6 w-6 text-primary" />
            Businesses
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage all registered businesses and their details
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search businesses..."
              defaultValue={currentSearch || ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 w-full border-gray-200 dark:border-gray-700"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{filterType ? `${filterType}` : "Filter Type"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => handleFilter(null)}
              >
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => handleFilter("Retail")}
              >
                Retail
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => handleFilter("Commercial")}
              >
                Commercial Real Estate
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => handleFilter("Manufacturing")}
              >
                Manufacturing
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer" 
                onClick={() => handleFilter("Residential")}
              >
                Residential
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          
          <Link
            href="/admin/businesses-list"
            className="inline-flex items-center gap-2 px-4 h-9 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">VT Businesses</span>
            <span className="sm:hidden">VT</span>
          </Link>
          
          <BusinessModalAction onSuccess={refresh} />
        </div>
      </div>
    </div>
  );
}