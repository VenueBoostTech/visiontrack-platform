import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import DemographicsContent from "@/components/User/Analytics/DemographicsContent";

export const metadata: Metadata = {
    title: "Demographics Analytics - VisionTrack",
    description: "Analyze visitor demographics and patterns in your properties.",
};

const AnalyticsDemographicsPage = () => {
    return (
        <>
            <DemographicsContent />
        </>
    );
};

export default AnalyticsDemographicsPage;