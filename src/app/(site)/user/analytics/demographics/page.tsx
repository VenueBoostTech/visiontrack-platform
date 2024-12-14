import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analytics Demographics - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsDemographicsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="AnalyticsDemographicsPage" />
            <div>
                <h1>AnalyticsDemographicsPage</h1>
            </div>
        </>
    );
};

export default AnalyticsDemographicsPage;