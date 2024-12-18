"use client";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteUser, updateUser } from "@/actions/user";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { TrashIcon } from "lucide-react";
import { User } from "@prisma/client";
import { UserRole } from "@prisma/client";

const arrowIcon = (
	<svg
		width='20'
		height='20'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M2.95339 5.67461C3.1331 5.46495 3.44875 5.44067 3.65841 5.62038L7.99968 9.34147L12.341 5.62038C12.5506 5.44067 12.8663 5.46495 13.046 5.67461C13.2257 5.88428 13.2014 6.19993 12.9917 6.37964L8.32508 10.3796C8.13783 10.5401 7.86153 10.5401 7.67429 10.3796L3.00762 6.37964C2.79796 6.19993 2.77368 5.88428 2.95339 5.67461Z'
			fill='white'
		/>
	</svg>
);

export default function UserAction({ user }: { user: User }) {
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
		toast.success("User deleted successfully!");
		router.refresh();
	  } catch (error: any) {
		toast.error(error.message);
	  } finally {
		setLoading(false);
		setShowDeleteModal(false);
	  }
	};
  
	const handleUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
	  const newRole = e.target.value as UserRole;
	  try {
		await updateUser({
		  email: user.email,
		  role: newRole,
		});
		toast.success("User Role updated successfully!");
		router.refresh();
	  } catch (error: any) {
		toast.error(error.message);
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
		  toast.success("Logged in successfully");
		  router.refresh();
		}
	  } catch (error) {
		toast.error("Failed to impersonate user");
	  }
	};
  
	return (
		<div className="flex items-center justify-end gap-2">
		  {session?.user?.role === 'ADMIN' && (
			<button
			  onClick={handleImpersonateLogin}
			  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
			>
			  Login As
			</button>
		  )}
	
		  {user.role !== 'ADMIN' && (
			<button
			  onClick={() => setShowDeleteModal(true)}
			  className="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
			>
			  <TrashIcon className="w-4 h-4" />
			</button>
		  )}
	
		  <DeleteModal
			showDeleteModal={showDeleteModal}
			setShowDeleteModal={setShowDeleteModal}
			deleteText={`Delete ${user.name || 'User'}`}
			handleDelete={handleDelete}
			loading={loading}
		  />
		</div>
	  );
  }