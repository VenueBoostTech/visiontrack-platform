import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics Parking - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsParkingPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="AnalyticsParkingPage" />
            <div>
                <h1>AnalyticsParkingPage</h1>
            </div>
        </>
    );
};

export default AnalyticsParkingPage;