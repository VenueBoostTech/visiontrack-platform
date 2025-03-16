// app/user/dashboard/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import RetailDashboardContent from "@/components/User/RetailDashboard/RetailDashboardContent";

export const metadata: Metadata = {
    title: "Dashboard - VisionTrack",
    description: "Real-time computer vision analytics for retail operations, customer insights, and security monitoring.",
};

export default function DashboardPage() {
    return (
        <div className="px-5">
            <RetailDashboardContent />
        </div>
    );
}