import React from "react";
import { Metadata } from "next";
import LiveViewContent from "@/components/User/LiveMonitoring/LiveViewContent";

export const metadata: Metadata = {
	title: `Monitoring Live - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring Live page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringLivePage = () => {
	return (
		<>
			<div className="px-5">
				<LiveViewContent />
			</div>
		</>
	);
};

export default MonitoringLivePage;