import React from "react";
import { Metadata } from "next";
import RecordingsContent from "@/components/Platform/LiveMonitoring/RecordingsContent";

export const metadata: Metadata = {
	title: `Monitoring Recordings - ${process.env.PLATFORM_NAME}`,
	description: `This is Monitoring Recordings page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const MonitoringRecordingsPage = () => {
	return (
		<>
			<div className="px-0">
				<RecordingsContent />
			</div>
		</>
	);
};

export default MonitoringRecordingsPage;