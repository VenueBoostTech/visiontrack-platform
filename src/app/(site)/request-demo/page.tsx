import React from "react";
import Support from "../../../components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Request a Demo - ${process.env.SITE_NAME}`,
	description: `This is request demo for ${process.env.SITE_NAME}`,
	// other discriptions
};

const RequestDemoPage = () => {
	return (
		<main>

		</main>
	);
};

export default RequestDemoPage;
