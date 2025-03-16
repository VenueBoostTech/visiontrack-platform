import React from "react";
import { Metadata } from "next";
import EmergencyResponseContent from "@/components/User/Security/EmergencyResponseContent";

export const metadata: Metadata = {
    title: "Emergency Response - VisionTrack",
    description: "Emergency Response - VisionTrack",
};

const EmergencyResponsePage = () => {
    return (
        <>
            <EmergencyResponseContent />
        </>
    );
};

export default EmergencyResponsePage;