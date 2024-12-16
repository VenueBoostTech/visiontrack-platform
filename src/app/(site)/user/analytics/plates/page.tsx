import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import VehicleContent from "@/components/User/Analytics/VehicleContent";

export const metadata: Metadata = {
    title: "Analytics Vehicles - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsPlatesPage = () => {
    return (
        <>
            <VehicleContent />
        </>
    );
};

export default AnalyticsPlatesPage;