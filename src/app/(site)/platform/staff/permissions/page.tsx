import React from "react";
import { Metadata } from "next";
// @ts-ignore
import PermissionsContent from "@/components/User/Staff/PermissionsContent";

export const metadata: Metadata = {
    title: "Staff Permissions - VisionTrack",
    description: "VisionTrack staff permissions management.",
};

const StaffPermissionsPage = () => {
    return (
        <>
            <div className="px-0">
                <PermissionsContent />
            </div>
        </>
    );
};

export default StaffPermissionsPage;