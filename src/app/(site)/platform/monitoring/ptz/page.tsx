import React from "react";
import { Metadata } from "next";
import PTZControlContent from "@/components/Platform/LiveMonitoring/PTZControlContent";

export const metadata: Metadata = {
	title: `Monitoring PTZ - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring PTZ page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringPTZPage = () => {
	return (
		<>
			<div className="px-0">
				<PTZControlContent />			
			</div>
		</>
	);
};

export default MonitoringPTZPage;