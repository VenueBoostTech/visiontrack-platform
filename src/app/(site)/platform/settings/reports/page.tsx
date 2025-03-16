import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings Reports - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const SettingsReportsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="SettingsReportsPage" />
            <div>
                <h1>SettingsReportsPage</h1>
            </div>
        </>
    );
};

export default SettingsReportsPage;
