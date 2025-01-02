"use client";

import { Input } from "@/components/ui/input";
import { Building2, Search, ExternalLink } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import BusinessModalAction from "@/components/Common/Modals/BusinessModalAction";
import Link from "next/link";

export default function BusinessTopbar() {
 const searchParams = useSearchParams();
 const pathname = usePathname();
 const { replace, refresh } = useRouter();

 const handleSearch = useDebouncedCallback((term: string) => {
   const params = new URLSearchParams(searchParams);
   if (term) {
     params.set('search', term);
   } else {
     params.delete('search');
   }
   replace(`${pathname}?${params.toString()}`);
 }, 300);

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
     <div className="flex items-center gap-2">
       <div className="relative">
         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
         <Input
           type="search"
           placeholder="Search businesses..."
           onChange={(e) => handleSearch(e.target.value)}
           className="pl-9 w-full sm:w-[250px]"
         />
       </div>
       <Link 
         href="/user/businesses-list"
         className="inline-flex items-center gap-2 px-4 h-9 py-1 bg-red-400 hover:bg-rd-600 text-white rounded-lg transition-colors"
       >
         <ExternalLink className="h-4 w-4" />
         VT Businesses
       </Link>
       <BusinessModalAction onSuccess={refresh} />
     </div>
   </div>
 );
}