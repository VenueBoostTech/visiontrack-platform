import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security Incidents - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const SecurityIncidentsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="Security Incidents" />
            <div>
                <h1>SecurityIncidentsPage</h1>
            </div>
        </>
    );
};

export default SecurityIncidentsPage;