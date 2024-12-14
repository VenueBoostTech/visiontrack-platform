import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security Alerts - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const SecurityAlertsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="Security Alerts" />
            <div>
                <h1>SecurityAlertsPage</h1>
            </div>
        </>
    );
};

export default SecurityAlertsPage;