import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Visitors from "@/components/Platform/Security/Visitors";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Visitors - ${process.env.PLATFORM_NAME}`,
	description: `This is Visitors page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const SecurityVisitorsPage = () => {
    return (
        <div className="px-0">
            <Breadcrumb pageTitle="Visitor Management" />
            <Visitors />
        </div>
    );
};

export default SecurityVisitorsPage;