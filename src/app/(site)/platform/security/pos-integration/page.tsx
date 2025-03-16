import React from "react";
import { Metadata } from "next";
import PosIntegrationContent from "@/components/Platform/Security/PosIntegrationContent";

export const metadata: Metadata = {
    title: "POS Integration - VisionTrack",
    description: "POS Integration - VisionTrack",
};

const PosIntegrationPage = () => {
    return (
        <>
            <PosIntegrationContent />
        </>
    );
};

export default PosIntegrationPage;