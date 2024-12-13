import { Price } from "@/types/priceItem";

export const pricingData: Price[] = [
	{
		priceId: "1212",
		unit_amount: 15 * 100, // $15 per camera/month
		displayPrice: "$15", // Add display price
		nickname: "Basic",
		description: "Perfect for small deployments with standard video analytics needs",
		subtitle: "Essential video analytics",
		includes: [
			"Basic analytics",
			"Cloud storage",
			"Mobile access",
			"Basic alerts",
			"ONVIF compliance",
			"RTSP stream access",
			"Network accessibility",
			"Basic VMS integration",
			"Email support"
		],
		icon: `/images/pricing/pricing-icon-01.svg`,
	},
	{
		priceId: "price_1OS326K9QDeYHZl0PU6PpQOs",
		unit_amount: 30 * 100, // $30 per camera/month
		displayPrice: "$30", // Add display price
		nickname: "Professional",
		description: "Ideal for growing businesses requiring advanced analytics",
		subtitle: "Advanced analytics & integrations",
		includes: [
			"Advanced analytics",
			"Custom alerts",
			"Integration features",
			"Advanced reporting",
			"Extended storage",
			"Priority support",
			"API access",
			"Custom alert rules",
			"Multiple user accounts"
		],
		icon: `/images/pricing/pricing-icon-02.svg`,
		icon2: `/images/pricing/pricing-icon-02-2.svg`,
		active: true,
	},
	{
		priceId: "price_1ObHcXLtGdPVhGLejTMpdiT8",
		unit_amount: 0, // Custom pricing
		displayPrice: "TBD",
		nickname: "Enterprise",
		description: "For large-scale operations with specific requirements",
		subtitle: "Full customization & priority support",
		includes: [
			"Full feature set",
			"Custom development",
			"Priority support",
			"SLA guarantees",
			"Custom AI models",
			"Advanced integration",
			"Unlimited storage",
			"Training & onboarding",
			"Dedicated support team",
			"Custom deployment options"
		],
		icon: `/images/pricing/pricing-icon-03.svg`,
	},
];