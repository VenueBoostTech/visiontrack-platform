import React from "react";
import Billing from "@/components/User/Billing";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Settings Billing - ${process.env.PLATFORM_NAME}`,
	description: `This is Settings Billing page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const SettingsBillingPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Settings Billing' />
			<Billing />
		</>
	);
};

export default SettingsBillingPage;
