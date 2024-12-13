import React from "react";
import Support from "../../../components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Contact - ${process.env.SITE_NAME}`,
	description: `This is contact page for ${process.env.SITE_NAME}`,
	// other discriptions
};

const ContactPage = () => {
	return (
		<main>
			<Support />
		</main>
	);
};

export default ContactPage;
