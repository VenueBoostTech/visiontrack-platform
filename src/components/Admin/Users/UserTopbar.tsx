"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  UsersIcon, 
  UserCogIcon, 
  ShieldIcon, 
  ShieldAlertIcon,
  PlusIcon
} from "lucide-react";
import InviteUserModal from "@/components/Common/Modals/InviteUserModal";

interface UserCountsProps {
  all: number;
  BUSINESS_OWNER: number;
  STAFF: number;
  ADMIN: number;
}

interface UserTopbarProps {
  userCounts?: UserCountsProps;
}

export default function UserTopbar({ userCounts = { all: 0, BUSINESS_OWNER: 0, STAFF: 0, ADMIN: 0 } }: UserTopbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentFilter = searchParams.get('filter') || 'all';
  
  const [filterValue, setFilterValue] = useState<string>(currentFilter);
  const [showInviteUserModal, setShowInviteUserModal] = useState<boolean>(false);
  
  // Update filter state when URL params change
  useEffect(() => {
    setFilterValue(currentFilter);
  }, [currentFilter]);

  const filterData = [
    {
      id: 1,
      title: "All Users",
      value: "all",
      icon: <UsersIcon size={18} />,
      count: userCounts.all
    },
    {
      id: 2,
      title: "Business Owners",
      value: "BUSINESS_OWNER",
      icon: <UserCogIcon size={18} />,
      count: userCounts.BUSINESS_OWNER
    },
    {
      id: 3,
      title: "Staff Members",
      value: "STAFF",
      icon: <ShieldIcon size={18} />,
      count: userCounts.STAFF
    },
    {
      id: 4,
      title: "VT Admins",
      value: "ADMIN",
      icon: <ShieldAlertIcon size={18} />,
      count: userCounts.ADMIN
    },
  ];

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value !== 'all') {
      params.set('filter', value);
    } else {
      params.delete('filter');
    }
    
    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-gray-dark">
        <div className="flex flex-wrap items-center gap-2">
          {filterData.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFilterChange(item.value)}
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border pl-3 pr-4 font-medium text-sm capitalize ${
                filterValue === item.value
                  ? "border-transparent bg-primary text-white shadow-sm"
                  : "border-stroke bg-gray-1 text-body hover:bg-gray-200 dark:border-stroke-dark dark:bg-white/5 dark:text-gray-5"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
              {item.count > 0 && (
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                  filterValue === item.value 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowInviteUserModal(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary p-3 text-white hover:bg-primary/90"
          >
            <Image
              src="/images/icon/plus.svg"
              alt="plus"
              width={20}
              height={20}
            />
            Add new user
          </button>
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