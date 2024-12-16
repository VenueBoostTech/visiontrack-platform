import React from "react";
import { Metadata } from "next";
import StaffMonitoringContent from "@/components/User/Security/StaffMonitoringContent";

export const metadata: Metadata = {
    title: "Staff Monitoring - VisionTrack",
    description: "Staff Monitoring - VisionTrack",
};

const StaffMonitoringPage = () => {
    return (
        <>
            <StaffMonitoringContent />
        </>
    );
};

export default StaffMonitoringPage;