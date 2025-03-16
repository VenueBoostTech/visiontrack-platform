// app/platform/security/access/page.tsx
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Access from "@/components/Platform/Security/Access";

export const metadata: Metadata = {
    title: "Security Access - VisionTrack",
    description: "Manage access control for your properties with VisionTrack's security management system.",
};

export default function SecurityAccessPage() {
    return (
        <div className="px-0">
            <Breadcrumb pageTitle="Access Management" />
            <Access />
        </div>
    );
}