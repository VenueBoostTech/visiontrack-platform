import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Monitoring Wall - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring Wall page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringWallPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Monitoring Wall' />
			<div>
				<h1>MonitoringWallPage</h1>
			</div>
		</>
	);
};

export default MonitoringWallPage;