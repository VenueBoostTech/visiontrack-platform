import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security Access - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const SecurityAccessPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="Security Access" />
            <div>
                <h1>SecurityAccessPage</h1>
            </div>
        </>
    );
};

export default SecurityAccessPage;