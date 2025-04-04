import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import EditProfile from "@/components/Platform/AccountSettings/EditProfile";
import PasswordChange from "@/components/Platform/AccountSettings/PasswordChange";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Account Settings - ${process.env.PLATFORM_NAME}`,
	description: `Account Settings Description`,
};

export default function AccountSettingsPage() {
	return (
		<>
			<Breadcrumb pageTitle='Account Settings' />

			<div className='flex flex-wrap gap-11 lg:flex-nowrap'>
				<EditProfile />

				<PasswordChange />
			</div>
		</>
	);
}
