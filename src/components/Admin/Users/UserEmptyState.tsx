"use client";

import Card from "@/components/Common/Dashboard/Card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import InviteUserModal from "@/components/Common/Modals/InviteUserModal";
import { Users, UserPlus } from "lucide-react";

export default function UserEmptyState() {
	const [showInviteUserModal, setShowInviteUserModal] = useState(false);

	return (
		<div>
			<Card>
				<div className="mx-auto w-full max-w-[510px] py-16 text-center">
					<div className="mb-8 flex justify-center">
						<div className="rounded-full bg-blue-50 p-4 dark:bg-blue-900/20">
							<Users className="h-10 w-10 text-blue-500" />
						</div>
					</div>
					<h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
						No Users Found
					</h2>
					<p className="mb-8 text-gray-600 dark:text-gray-400">
						Get started by adding your first user to the platform.
						<br />
						Manage access and permissions for your team members and business owners.
					</p>
					
					<Button 
						onClick={() => setShowInviteUserModal(true)}
						className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
					>
						<UserPlus className="h-4 w-4" />
						Add Your First User
					</Button>
				</div>
			</Card>

			{showInviteUserModal && (
				<InviteUserModal
					setShowModal={setShowInviteUserModal}
					showModal={showInviteUserModal}
					text={"Add User"}
					loading={false}
				/>
			)}
		</div>
	);
}