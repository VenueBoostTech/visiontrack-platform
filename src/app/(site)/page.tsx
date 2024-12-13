import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `VisionTrack - Enterprise Property Intelligence Platform`,
	description: `Advanced AI surveillance and analytics for commercial & residential properties!`,
	openGraph: {
		type: "website",
		title: `VisionTrack - Enterprise Property Intelligence Platform`,
		description: `Advanced AI surveillance and analytics for commercial & residential properties`,
		images:
			"https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
	},
	twitter: {
		card: "summary_large_image",
		title: `VisionTrack - Enterprise Property Intelligence Platform`,
		description: `Advanced AI surveillance and analytics for commercial & residential properties`,
		images:
			"https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
	},
};

export default function HomePage() {
	return (
		<main>
			<Home />
		</main>
	);
}
