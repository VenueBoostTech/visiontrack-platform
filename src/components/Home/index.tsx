// src/app/page.tsx
import Hero from "@/components/Home/Hero";
import IndustrySpecific from "@/components/Home/IndustrySpecific";
import EnterpriseGrade from "@/components/Home/EnterpriseGrade";
import CoreFeatures from "@/components/Home/CoreFeatures";
import PowerfulAnalytics from "@/components/Home/PowerfulAnalytics";
import Integration from "@/components/Home/Integration";
import CallToAction from "@/components/Home/CallToAction";
import Pricing from "@/components/Home/Pricing";

export default function HomePage() {
	return (
		<main className="min-h-screen">
			<Hero />
			<IndustrySpecific />
			<EnterpriseGrade />
			<CoreFeatures />
			<PowerfulAnalytics />
			<Pricing />
			<Integration />
			<CallToAction />
		</main>
	);
}