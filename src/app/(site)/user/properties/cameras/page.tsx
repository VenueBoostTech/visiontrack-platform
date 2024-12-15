import React from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Properties Cameras - ${process.env.PLATFORM_NAME}`,
	description: `This is Properties Cameras page for ${process.env.PLATFORM_NAME}`,
	// other discriptions
};

const PropertiesCamerasPage = () => {
	return (
		<>
			<Breadcrumb pageTitle='Properties Cameras' />
			<div>
				<h1>PropertiesCamerasPage</h1>
			</div>
		</>
	);
};

export default PropertiesCamerasPage;