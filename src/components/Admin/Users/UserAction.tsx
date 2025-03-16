"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteUser, updateUser } from "@/actions/user";
import { signIn } from "next-auth/react";
import { User, UserRole } from "@prisma/client";
import { 
  Trash2Icon, 
  LogInIcon, 
  MoreVerticalIcon,
  UserCogIcon,
  ShieldIcon
} from "lucide-react";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserActionProps {
  user: User;
}

export default function UserAction({ user }: UserActionProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Only allow role changes to/from BUSINESS_OWNER and STAFF
  const availableRoles = ['BUSINESS_OWNER', 'STAFF'];

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

  if (!canChangeRole && !canImpersonate && !canDelete) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="inline-flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
            <MoreVerticalIcon className="w-4 h-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {canImpersonate && (
            <DropdownMenuItem onClick={handleImpersonateLogin} className="cursor-pointer flex items-center gap-2">
              <LogInIcon className="w-4 h-4 text-primary" />
              <span>Login as {user.name || 'User'}</span>
            </DropdownMenuItem>
          )}

          {canChangeRole && (
            <>
              {canImpersonate && <DropdownMenuSeparator />}
              
              <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
                Change Role
              </div>
              
              {availableRoles.map((role) => (
                <DropdownMenuItem 
                  key={role}
                  onClick={() => handleUpdateRole(role as UserRole)}
                  disabled={user.role === role}
                  className={`cursor-pointer flex items-center gap-2 ${user.role === role ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                >
                  {role === 'BUSINESS_OWNER' ? (
                    <UserCogIcon className="w-4 h-4 text-blue-600" />
                  ) : (
                    <ShieldIcon className="w-4 h-4 text-green-600" />
                  )}
                  <span>{role === 'BUSINESS_OWNER' ? 'Business Owner' : 'Staff Member'}</span>
                  {user.role === role && (
                    <span className="ml-auto text-primary">●</span>
                  )}
                </DropdownMenuItem>
              ))}
            </>
          )}

          {canDelete && (
            <>
              {(canImpersonate || canChangeRole) && <DropdownMenuSeparator />}
              
              <DropdownMenuItem 
                onClick={() => setShowDeleteModal(true)} 
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 dark:hover:text-red-400 flex items-center gap-2"
              >
                <Trash2Icon className="w-4 h-4" />
                <span>Delete User</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

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