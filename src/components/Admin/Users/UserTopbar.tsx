"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { debounce } from "lodash";
import { UserRole } from "@prisma/client";
import { 
  UsersIcon, 
  UserCogIcon, 
  ShieldIcon, 
  ShieldAlertIcon,
  PlusIcon,
  Search
} from "lucide-react";
import InviteUserModal from "@/components/Common/Modals/InviteUserModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type FilterOption = {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  count?: number;
};

interface UserTopbarProps {
  userCounts?: {
    all: number;
    BUSINESS_OWNER: number;
    STAFF: number;
    ADMIN: number;
  };
}

export default function UserTopbar({ userCounts }: UserTopbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentFilter = searchParams.get('filter') || 'all';
  const currentSearch = searchParams.get('search') || '';
  
  const [filterValue, setFilterValue] = useState<string>(currentFilter);
  const [searchValue, setSearchValue] = useState<string>(currentSearch);
  const [showInviteUserModal, setShowInviteUserModal] = useState<boolean>(false);
  
  // Update filter state when URL params change
  useEffect(() => {
    setFilterValue(currentFilter);
    setSearchValue(currentSearch);
  }, [currentFilter, currentSearch]);

  const filterData: FilterOption[] = [
    {
      id: 1,
      title: "All Users",
      value: "all",
      icon: <UsersIcon size={18} />,
      count: userCounts?.all
    },
    {
      id: 2,
      title: "Business Owners",
      value: "BUSINESS_OWNER",
      icon: <UserCogIcon size={18} />,
      count: userCounts?.BUSINESS_OWNER
    },
    {
      id: 3,
      title: "Staff Members",
      value: "STAFF",
      icon: <ShieldIcon size={18} />,
      count: userCounts?.STAFF
    },
    {
      id: 4,
      title: "VT Admins",
      value: "ADMIN",
      icon: <ShieldAlertIcon size={18} />,
      count: userCounts?.ADMIN
    },
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      
      router.push(`/admin/users?${params.toString()}`);
    }, 500),
    [router, searchParams]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value !== 'all') {
      params.set('filter', value);
    } else {
      params.delete('filter');
    }
    
    if (searchValue) {
      params.set('search', searchValue);
    }
    
    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-gray-dark">
        <div className="flex flex-wrap items-center gap-2">
          {filterData.map((item) => (
            <Button
              key={item.id}
              variant={filterValue === item.value ? "default" : "outline"}
              className={`h-10 gap-2 py-2 px-3 ${
                filterValue === item.value 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleFilterChange(item.value)}
            >
              {item.icon}
              <span className="font-medium capitalize">{item.title}</span>
              {item.count !== undefined && (
                <Badge 
                  variant={filterValue === item.value ? "outline" : "secondary"}
                  className={`ml-1 ${
                    filterValue === item.value 
                      ? "bg-primary/20 text-white border-white" 
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="default"
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={() => setShowInviteUserModal(true)}
          >
            <PlusIcon size={18} />
            <span>Add New User</span>
          </Button>

          <div className="relative w-full md:w-auto">
            <Search 
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" 
            />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchValue}
              onChange={handleSearchChange}
              className="h-10 min-w-[250px] pl-10 pr-4 rounded-lg border border-gray-200 bg-white focus-visible:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-primary"
            />
          </div>
        </div>
      </div>

      {showInviteUserModal && (
        <InviteUserModal
          setShowModal={setShowInviteUserModal}
          showModal={showInviteUserModal}
          text="Add User"
          loading={false}
        />
      )}
    </>
  );
}