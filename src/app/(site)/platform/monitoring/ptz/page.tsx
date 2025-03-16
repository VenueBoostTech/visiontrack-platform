import React from "react";
import { Metadata } from "next";
import PTZControlContent from "@/components/User/LiveMonitoring/PTZControlContent";

export const metadata: Metadata = {
	title: `Monitoring PTZ - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring PTZ page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringPTZPage = () => {
	return (
		<>
			<div className="px-5">
				<PTZControlContent />			
			</div>
		</>
	);
};

export default MonitoringPTZPage;