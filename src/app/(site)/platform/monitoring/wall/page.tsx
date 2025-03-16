import React from "react";
import { Metadata } from "next";
import VideoWallContent from "@/components/User/LiveMonitoring/VideoWallContent";

export const metadata: Metadata = {
	title: `Monitoring Wall - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring Wall page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringWallPage = () => {
	return (
		<>
			<div className="px-0">
				<VideoWallContent />
			</div>
		</>
	);
};

export default MonitoringWallPage;