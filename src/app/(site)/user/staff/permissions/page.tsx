import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Staff Permissions - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const StaffPermissionsPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="StaffPermissionsPage" />
            <div>
                <h1>StaffPermissionsPage</h1>
            </div>
        </>
    );
};

export default StaffPermissionsPage;