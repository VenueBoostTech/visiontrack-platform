import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Properties Buildings - ${process.env.PLATFORM_NAME}`,
	description: `This is Properties Buildings page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const PropertiesBuildingsPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Properties Buildings' />
			<div>
				<h1>PropertiesBuildingsPage</h1>
			</div>
		</>
	);
};

export default PropertiesBuildingsPage;