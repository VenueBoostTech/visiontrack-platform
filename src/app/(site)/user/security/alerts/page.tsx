import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Alerts from "@/components/User/Security/Alerts";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Security Alerts - ${process.env.PLATFORM_NAME}`,
	description: `This is Security Alerts page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const SecurityAlertsPage = () => {

    return (
        <div className="px-5">
            <Breadcrumb pageTitle="Security Settings" />
            <Alerts />
        </div>
    );
};

export default SecurityAlertsPage;
