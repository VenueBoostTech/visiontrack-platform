import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Staff - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const StaffPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="StaffPage" />
            <div>
                <h1>StaffPage</h1>
            </div>
        </>
    );
};

export default StaffPage;