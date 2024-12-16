import React from "react";
import { Metadata } from "next";
import ParkingContent from "@/components/User/Analytics/ParkingContent";

export const metadata: Metadata = {
    title: "Analytics Parking - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsParkingPage = () => {
    return (
        <>
            <ParkingContent />
        </>
    );
};

export default AnalyticsParkingPage;