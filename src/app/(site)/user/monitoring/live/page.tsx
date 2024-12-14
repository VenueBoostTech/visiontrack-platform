import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Monitoring Live - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring Live page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringLivePage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Monitoring Live' />
			<div>
				<h1>MonitoringLivePage</h1>
			</div>
		</>
	);
};

export default MonitoringLivePage;