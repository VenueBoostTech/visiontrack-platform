"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";
import InputSelect from "@/components/Common/InputSelect";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserAction from "./UserAction";

interface UserListTableProps {
  users: User[];
  isLoading?: boolean;
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSize?: number;
}

export default function UserListTable({ 
  users, 
  isLoading = false,
  totalItems = 0,
  totalPages = 1,
  currentPage = 1,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  pageSize = 10
}: UserListTableProps) {
  // Get user role badge color
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "BUSINESS_OWNER":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "STAFF":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="w-full border rounded-xl border-stroke bg-white p-0 dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Joined
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Last Login
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <RefreshCcw className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </td>
              </tr>
            ) : !users || users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/images/icon/user-icon.svg"
                      alt="No users"
                      width={48}
                      height={48}
                      className="opacity-30 mb-3"
                    />
                    <h3 className="text-lg font-medium mb-1">No users found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User"}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-lg font-medium uppercase text-gray-600">
                            {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                      <h5 className="font-medium text-black dark:text-white">
                        {user.name || "-"}
                      </h5>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <p className="text-black dark:text-white">{user.email}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <span className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${getRoleBadge(user.role)}`}>
                      {user.role === "BUSINESS_OWNER" ? "Business Owner" : user.role === "STAFF" ? "Staff" : user.role}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : '-'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user.lastLoginAt ? format(new Date(user.lastLoginAt), 'MMM dd, yyyy') : 'Never'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark text-right">
                    <UserAction user={user} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-4 p-4 border-t border-stroke dark:border-strokedark">
          <div className="w-28">
            <InputSelect
              name="pageSize"
              label=""
              value={pageSize.toString()}
              onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
              options={[
                { value: "10", label: "10 rows" },
                { value: "20", label: "20 rows" },
                { value: "50", label: "50 rows" }
              ]}
            />
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first page, last page, and pages around current page
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) {
                      // Near the start, show first 5 pages
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Near the end, show last 5 pages
                      pageNum = totalPages - 4 + i;
                    } else {
                      // In the middle, show 2 before and 2 after current page
                      pageNum = currentPage - 2 + i;
                    }
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={currentPage === pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <p className="text-sm text-muted-foreground min-w-[180px] text-right">
            Showing <span className="font-medium">{users.length}</span> of{" "}
            <span className="font-medium">{totalItems}</span> users
          </p>
        </div>
      </div>
    </div>
  );
}