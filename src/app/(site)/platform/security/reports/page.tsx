import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Reports from "@/components/User/Security/Reports";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Security Reports - ${process.env.PLATFORM_NAME}`,
	description: `This is Security Reports page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const SecurityReportsPage = () => {
    return (
        <div className="px-5">
            <Breadcrumb pageTitle="Security Reports" />
            <Reports />
        </div>
    );
};

export default SecurityReportsPage;