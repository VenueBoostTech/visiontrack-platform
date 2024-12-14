import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Monitoring Recordings - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring Recordings page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringRecordingsPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Monitoring Recordings' />
			<div>
				<h1>MonitoringRecordingsPage</h1>
			</div>
		</>
	);
};

export default MonitoringRecordingsPage;