import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security Visitors - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const SecurityVisitorsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="Security Visitors" />
            <div>
                <h1>SecurityVisitorsPage</h1>
            </div>
        </>
    );
};

export default SecurityVisitorsPage;