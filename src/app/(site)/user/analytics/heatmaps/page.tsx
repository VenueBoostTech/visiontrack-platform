import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics Heatmaps - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsHeatmapsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="AnalyticsHeatmapsPage" />
            <div>
                <h1>AnalyticsHeatmapsPage</h1>
            </div>
        </>
    );
};

export default AnalyticsHeatmapsPage;