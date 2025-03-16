"use client";
import Header from ".";
import { usePathname } from "next/navigation";

export const HeaderWrapper = () => {
	const pathname = usePathname();

	return (
		<>
			{!pathname.startsWith("/admin") && !pathname.startsWith("/platform") && (
				<Header />
			)}
		</>
	);
};
