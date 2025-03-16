import "../../styles/satoshi.css";
import "react-quill/dist/quill.snow.css";
import "../../styles/globals.css";
import { Providers } from "./providers";
import ToastContext from "../context/ToastContext";
import NextTopLoader from "nextjs-toploader";
import Loader from "@/components/Common/PreLoader";
import FooterWrapper from "@/components/Footer/FooterWrapper";
import { HeaderWrapper } from "@/components/Header/HeaderWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

	return (
		<>
			<Loader />
			<>
				<ToastContext />
				<Providers>
					<NextTopLoader
						color='#5577FF'
						crawlSpeed={300}
						showSpinner={false}
						shadow='none'
					/>
					<HeaderWrapper />
					{children}
					<GoogleAnalytics measurementId={measurementId} />
					<FooterWrapper />
				</Providers>
			</>
		</>
	);
}
