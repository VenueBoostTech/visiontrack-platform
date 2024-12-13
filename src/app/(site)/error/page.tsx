import NotFound from "@/components/404";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Error - ${process.env.PLATFORM_NAME}`,
	description: `This is Error page for ${process.env.PLATFORM_NAME}`,
};

const ErrorPage = () => {
	return (
		<>
			<NotFound />
		</>
	);
};

export default ErrorPage;
