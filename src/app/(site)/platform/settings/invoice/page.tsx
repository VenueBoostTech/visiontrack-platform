import React from "react";
import PurchaseHistory from "@/components/Platform/PurchaseHistory";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Settings Invoice - ${process.env.PLATFORM_NAME}`,
	description: `This is Invoice page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const SettingsInvoicePage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Settings Invoice' />
			<PurchaseHistory />
		</>
	);
};

export default SettingsInvoicePage;
