import SendNotificationCard from "@/components/Admin/SendNotification/SendNotificationCard";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Send Notification - ${process.env.PLATFORM_NAME}`,
	description: `Send Notification Description`,
};

export default function SendNotificationPage() {
	return (
		<>
			<Breadcrumb pageTitle='Send Notification' />

			<SendNotificationCard />
		</>
	);
}
