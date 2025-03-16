"use client";

import { useState, useEffect, useCallback } from "react";
import UserEmptyState from "./UserEmptyState";
import UserListTable from "./UserListTable";
import UserTopbar from "./UserTopbar";
import { getUsers } from "@/actions/user";
import { User } from "@prisma/client";
import UserSkeleton from "./UserSkeleton";
import { Card } from "@/components/ui/card";

interface UsersListContainerProps {
  filter?: string;
  search?: string;
}

export default function UsersListContainer({ filter, search }: UsersListContainerProps) {
  // User data state
  const [users, setUsers] = useState<User[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // User counts for filter tabs
  const [userCounts, setUserCounts] = useState({
    all: 0,
    BUSINESS_OWNER: 0,
    STAFF: 0,
    ADMIN: 0
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let fetchedUsers = await getUsers(filter);
      
      if (search) {
        fetchedUsers = fetchedUsers?.filter((user) =>
          user?.email?.toLowerCase().includes(search?.toLowerCase()) ||
          user?.name?.toLowerCase().includes(search?.toLowerCase())
        );
      }
      
      setUsers(fetchedUsers);
      
      // Calculate user counts for filter tabs
      if (fetchedUsers) {
        const counts = {
          all: fetchedUsers.length,
          BUSINESS_OWNER: fetchedUsers.filter(user => user.role === 'BUSINESS_OWNER').length,
          STAFF: fetchedUsers.filter(user => user.role === 'STAFF').length,
          ADMIN: fetchedUsers.filter(user => user.role === 'ADMIN').length
        };
        setUserCounts(counts);
        
        // Update total pages
        setTotalPages(Math.ceil(fetchedUsers.length / pageSize));
        
        // Apply pagination
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setFilteredUsers(fetchedUsers.slice(startIndex, endIndex));
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filter, search, currentPage, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  if (loading) {
    return (
      <div className="space-y-5">
        <UserTopbar userCounts={userCounts} />
        <UserSkeleton count={pageSize} withHeader={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-5">
        <UserTopbar userCounts={userCounts} />
        <Card className="p-8 text-center">
          <div className="mb-4 rounded-full bg-red-100 p-3 inline-flex mx-auto">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Failed to Load Users</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{error}</p>
          <button
            onClick={() => fetchUsers()}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="space-y-6">
		 {/* Header */}
		<div>
			<h2 className="text-2xl text-gray-700 font-bold">User Management</h2>
			<p className="text-gray-700 mt-1">
				Manage user accounts, permissions, and access across your organization
			</p>
		</div>
        <UserTopbar userCounts={userCounts} />
        <UserEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
		{/* Header */}
		<div>
			<h2 className="text-2xl text-gray-700 font-bold">User Management</h2>
			<p className="text-gray-700 mt-1">
				Manage user accounts, permissions, and access across your organization
			</p>
		</div>
      <UserTopbar userCounts={userCounts} />
      <UserListTable 
        users={filteredUsers || []}
        isLoading={loading}
        totalItems={users.length}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
      />
    </div>
  );
}