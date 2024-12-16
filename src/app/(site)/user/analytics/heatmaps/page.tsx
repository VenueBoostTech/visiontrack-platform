import React from "react";
import { Metadata } from "next";
import HeatmapContent from "@/components/User/Analytics/HeatmapContent";

export const metadata: Metadata = {
    title: "Heatmap Analytics - VisionTrack",
    description: "Analyze movement patterns and high-traffic areas in your properties.",
};

const AnalyticsHeatmapsPage = () => {
    return (
        <>
            <HeatmapContent />
        </>
    );
};

export default AnalyticsHeatmapsPage;