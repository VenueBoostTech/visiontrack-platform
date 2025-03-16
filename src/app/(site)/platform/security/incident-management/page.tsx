import React from "react";
import { Metadata } from "next";
import IncidentManagementContent from "@/components/Platform/Security/IncidentManagement";

export const metadata: Metadata = {
    title: "Incident Management - VisionTrack",
    description: "Incident Management - VisionTrack",
};

    const IncidentManagementPage = () => {
    return (
        <>
            <IncidentManagementContent />
        </>
    );
};

export default IncidentManagementPage;