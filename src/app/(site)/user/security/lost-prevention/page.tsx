import React from "react";
import { Metadata } from "next";
import LossPreventionContent from "@/components/User/Security/LossPreventionContent";

export const metadata: Metadata = {
    title: "Loss Prevention - VisionTrack",
    description: "Monitor and prevent retail shrinkage with AI-powered analytics.",
};

const LossPreventionPage = () => {
    return (
        <>
            <LossPreventionContent />
        </>
    );
};

export default LossPreventionPage;