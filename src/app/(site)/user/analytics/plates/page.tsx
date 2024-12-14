import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics Plates - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsPlatesPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="AnalyticsPlatesPage" />
            <div>
                <h1>AnalyticsPlatesPage</h1>
            </div>
        </>
    );
};

export default AnalyticsPlatesPage;