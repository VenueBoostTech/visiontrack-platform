import { Business, User, BusinessType } from "@prisma/client";
import { MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BusinessWithRelations extends Business {
  owner: User;
  staff: Array<{ user: User }>;
}

const getBusinessTypeDisplay = (type: BusinessType) => {
  switch(type) {
    case 'COMMERCIAL_REAL_ESTATE':
      return 'Commercial Real Estate';
    case 'MANUFACTURING_WAREHOUSING':
      return 'Manufacturing & Warehousing';
    case 'MULTI_FAMILY_RESIDENTIAL':
      return 'Multi-Family Residential';
    case 'RETAIL':
      return 'Retail';
    default:
      return type;
  }
};

export default function BusinessTable({ 
  businesses 
}: { 
  businesses: BusinessWithRelations[] 
}) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium">Business Name</th>
            <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium">Owner</th>
            <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium">Type</th>
            <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">Staff</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <tr key={business.id} className="border-b last:border-0">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{business.name}</div>
                  <div className="text-sm text-gray-500">{business.email}</div>
                </div>
              </td>
              <td className="hidden md:table-cell px-4 py-3">
                <div className="flex items-center gap-2">
                  {business.owner.image ? (
                    <img 
                      src={business.owner.image} 
                      alt={business.owner.name || ''} 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {business.owner.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{business.owner.name}</span>
                </div>
              </td>
              <td className="hidden lg:table-cell px-4 py-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                  {getBusinessTypeDisplay(business.vt_use_scenario)}
                </span>
              </td>
              <td className="hidden sm:table-cell px-4 py-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{business.staff.length}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px] bg-white dark:bg-gray-800">
                    <DropdownMenuItem className="cursor-pointer text-sm">
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm">
                      Edit Business
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm">
                      Manage Staff
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm text-red-600">
                      Delete Business
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}