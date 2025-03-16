import React from "react";
import { Metadata } from "next";
import PosIntegrationContent from "@/components/User/Security/PosIntegrationContent";

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