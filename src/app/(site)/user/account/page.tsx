import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import AccountSettings from "@/components/User/AccountSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `User Dashboard - ${process.env.PLATFORM_NAME}`,
	description: `This is User Dashboard page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const AccountPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Account Settings' />
			<AccountSettings />
		</>
	);
};

export default AccountPage;
