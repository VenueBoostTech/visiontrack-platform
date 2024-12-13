import { Price } from "@/types/priceItem";

export const pricingData: Price[] = [
	{
		priceId: "1212",
		unit_amount: 499 * 100, // $499
		nickname: "Starter",
		description: "Perfect for small properties with basic security needs",
		subtitle: "For small properties",
		includes: [
			"Up to 10 cameras",
			"2 properties max",
			"Basic motion detection",
			"Real-time alerts",
			"7-day video storage",
			"Email support",
			"Mobile app access",
			"Basic analytics"
		],
		icon: `/images/pricing/pricing-icon-01.svg`,
	},
	{
		priceId: "price_1OS326K9QDeYHZl0PU6PpQOs",
		unit_amount: 999 * 100, // $999
		nickname: "Professional",
		description: "Ideal for growing properties requiring advanced security",
		subtitle: "For growing businesses",
		includes: [
			"Up to 50 cameras",
			"5 properties max",
			"AI-powered detection",
			"Custom alert rules",
			"30-day video storage",
			"24/7 priority support",
			"Advanced analytics",
			"Custom reporting",
			"API access",
			"Multiple user accounts"
		],
		icon: `/images/pricing/pricing-icon-02.svg`,
		icon2: `/images/pricing/pricing-icon-02-2.svg`,
		active: true,
	},
	{
		priceId: "price_1ObHcXLtGdPVhGLejTMpdiT8",
		unit_amount: 0, // Custom pricing
		nickname: "Enterprise",
		description: "For large-scale operations with specific requirements",
		subtitle: "For large operations",
		includes: [
			"Unlimited cameras",
			"Unlimited properties",
			"Custom AI models",
			"Advanced integration",
			"Unlimited storage",
			"Dedicated support",
			"Custom features",
			"SLA guarantee",
			"Training & onboarding",
			"Custom development"
		],
		icon: `/images/pricing/pricing-icon-03.svg`,
	},
];