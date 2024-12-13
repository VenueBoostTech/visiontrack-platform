import React from "react";
import Billing from "@/components/User/Billing";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Billing - ${process.env.PLATFORM_NAME}`,
	description: `This is Billing page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const BillingPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Billing' />
			<Billing />
		</>
	);
};

export default BillingPage;
