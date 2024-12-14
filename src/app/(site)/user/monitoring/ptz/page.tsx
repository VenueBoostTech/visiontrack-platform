import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Monitoring PTZ - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring PTZ page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringPTZPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Monitoring PTZ' />
			<div>
				<h1>MonitoringPTZPage</h1>
			</div>
		</>
	);
};

export default MonitoringPTZPage;