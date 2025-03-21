import { NextResponse } from "next/server";
import Stripe from "stripe";
import { absoluteUrl } from "@/libs/uitls";
import { isAuthorized } from "@/libs/isAuthorized";

export async function POST(request: Request) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
		apiVersion: "2023-10-16",
	});
	const data = await request.json();
	const { isSubscribed, priceId, stripeCustomerId, userId } = data;

	// Ensure paths start with forward slash
	let successUrl = '';
	let billingUrl = '';

	const user = await isAuthorized();
	if (user) {
		successUrl = absoluteUrl('/platform/billing');
		billingUrl = absoluteUrl('/platform/billing');
	} else {
		successUrl = absoluteUrl('/thank-you');
		billingUrl = absoluteUrl('/');
	}

	if (isSubscribed && stripeCustomerId) {
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: stripeCustomerId,
			return_url: billingUrl,
		});

		return NextResponse.json({ url: stripeSession.url }, { status: 200 });
	}

	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: successUrl,
			cancel_url: billingUrl,
			metadata: {
				userId,
			},
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error('Stripe session creation error:', error);
		return NextResponse.json(
			{ error: 'Failed to create checkout session' },
			{ status: 500 }
		);
	}
}