import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics People - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsPeoplePage = () => {
    return (
        <>
            <Breadcrumb pageTitle="AnalyticsPeoplePage" />
            <div>
                <h1>AnalyticsPeoplePage</h1>
            </div>
        </>
    );
};

export default AnalyticsPeoplePage;