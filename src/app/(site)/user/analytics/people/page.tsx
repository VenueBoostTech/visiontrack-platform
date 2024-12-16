import React from "react";
import { Metadata } from "next";
import PeopleContent from "@/components/User/Analytics/PeopleContent";

export const metadata: Metadata = {
    title: "Analytics People - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const AnalyticsPeoplePage = () => {
    return (
        <>
            <PeopleContent />
        </>
    );
};

export default AnalyticsPeoplePage;