import React from "react";
import Contact from "../../../components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Contact - ${process.env.PLATFORM_NAME}`,
	description: `This is contact page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const ContactPage = () => {
	return (
		<main>
			<Contact />
		</main>
	);
};

export default ContactPage;
