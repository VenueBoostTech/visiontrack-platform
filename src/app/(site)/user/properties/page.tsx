import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Properties - ${process.env.PLATFORM_NAME}`,
	description: `This is Properties page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const PropertiesPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Properties' />
			<div>
				<h1>PropertiesPage</h1>
			</div>
		</>
	);
};

export default PropertiesPage;
