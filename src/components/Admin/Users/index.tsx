"use client";

import { useState, useEffect } from "react";
import UserEmptyState from "./UserEmptyState";
import UserListTable from "./UserListTable";
import UserTopbar from "./UserTopbar";
import { getUsers } from "@/actions/user";
import { User } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UsersListContainerProps {
  filter?: string;
  search?: string;
}

export default function UsersListContainer({ filter, search }: UsersListContainerProps) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
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
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filter, search]);

  if (loading) {
    return (
      <div className="space-y-5">
        <UserTopbar />
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-5">
        <UserTopbar />
        <Card className="p-8 text-center">
          <div className="mb-4 rounded-full bg-red-100 p-3 inline-flex mx-auto">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Failed to Load Users</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
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
      <div className="space-y-5">
        <UserTopbar />
        <UserEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <UserTopbar />
      <UserListTable users={users} />
    </div>
  );
}