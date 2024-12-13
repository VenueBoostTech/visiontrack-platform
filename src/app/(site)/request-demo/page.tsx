// src/app/request-demo/page.tsx
import RequestDemoForm from "@/components/RequestDemoForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Request a Demo - VisionTrack`,
	description: `Experience how VisionTrack's AI-powered video intelligence platform can transform your surveillance system into actionable business insights. Get a personalized demo today.`,
};

const RequestDemoPage = () => {
	return (
		<main className="min-h-screen bg-gray-50 pt-20 pb-20 dark:bg-gray-950">
			<RequestDemoForm />
		</main>
	);
};

export default RequestDemoPage;