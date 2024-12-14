import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - VisionTrack",
    description: "VisionTrack property management and security dashboard.",
};

const DashboardPage = () => {
    return (
        <>
            <Breadcrumb pageTitle="Dashboard" />
            <div>
                <h1>Dashboard</h1>
            </div>
        </>
    );
};

export default DashboardPage;