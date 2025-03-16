"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteUser, updateUser } from "@/actions/user";
import { signIn } from "next-auth/react";
import { User, UserRole } from "@prisma/client";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import InputSelect from "@/components/Common/InputSelect";

interface UserActionProps {
  user: User;
}

export default function UserAction({ user }: UserActionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(user);
      toast.success(`${user.name || 'User'} deleted successfully!`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleUpdateRole = async (newRole: UserRole) => {
    try {
      await updateUser({
        email: user.email,
        role: newRole,
      });
      toast.success(`${user.name}'s role updated successfully!`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user role");
    }
  };

  const handleImpersonateLogin = async () => {
    try {
      const result = await signIn("impersonate", {
        adminEmail: session?.user?.email,
        userEmail: user?.email,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`Logged in as ${user.name || user.email}`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to impersonate user");
    }
  };

  // Don't show role change options for ADMIN users or if current user isn't an ADMIN
  const canChangeRole = user.role !== 'ADMIN' && session?.user?.role === 'ADMIN';
  
  // Only ADMIN users can impersonate
  const canImpersonate = session?.user?.role === 'ADMIN';
  
  // Only non-ADMIN users can be deleted
  const canDelete = user.role !== 'ADMIN';

  // No actions available
  if (!canChangeRole && !canImpersonate && !canDelete) {
    return <span className="text-sm text-gray-400">No actions</span>;
  }

  const handleAction = (action: string) => {
    switch (action) {
      case "login":
        handleImpersonateLogin();
        break;
      case "delete":
        setShowDeleteModal(true);
        break;
      case "BUSINESS_OWNER":
      case "STAFF":
        handleUpdateRole(action as UserRole);
        break;
      default:
        break;
    }
  };

  // Create options array based on available actions
  const actionOptions = [
    { value: "", label: "Actions" },
  ];
  
  if (canImpersonate) {
    actionOptions.push({ value: "login", label: "Login as User" });
  }
  
  if (canChangeRole) {
    if (user.role !== "BUSINESS_OWNER") {
      actionOptions.push({ value: "BUSINESS_OWNER", label: "Make Business Owner" });
    }
    if (user.role !== "STAFF") {
      actionOptions.push({ value: "STAFF", label: "Make Staff Member" });
    }
  }
  
  if (canDelete) {
    actionOptions.push({ value: "delete", label: "Delete User" });
  }

  return (
    <>
      <div className="flex justify-end">
        <div className="w-32">
          <InputSelect
            name="userAction"
            label=""
            options={actionOptions}
            onChange={(e) => handleAction(e.target.value)}
            value=""
          />
        </div>
      </div>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText={`Delete ${user.name || 'User'}`}
        handleDelete={handleDelete}
        loading={loading}
        message={`Are you sure you want to delete ${user.name || user.email}? This action cannot be undone.`}
      />
    </>
  );
}