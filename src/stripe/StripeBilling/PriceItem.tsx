"use client";
import axios from "axios";
import { Price } from "@/types/priceItem";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { integrations, messages } from "../../../integrations.config";
import toast from "react-hot-toast";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

// @ts-ignore
const PriceItem = ({plan, isBilling}: Props) => {
	const {data: session} = useSession();
	const user = session?.user;

	// stripe payment
	const handleSubscription = async () => {
		let subsProp: any = {
			priceId: plan.priceId,
		};

		if (!integrations?.isPaymentsEnabled) {
			toast.error(messages?.payment);
			return;
		}

		if (session) {
			const isSubscribed =
				user?.priceId &&
				user?.currentPeriodEnd &&
				new Date(user.currentPeriodEnd).getTime() + 86_400_000 > Date.now();

			subsProp = {
				userId: session?.user?.id,
				priceId: plan.priceId,
				isSubscribed,
			};
		}

		try {
			const res = await axios.post("/api/stripe/payment", {
				...subsProp,
			});

			const checkOutSession = res.data;

			if (checkOutSession) {
				window.location.href = checkOutSession.url ?? "/thank-you";
			}
		} catch (err) {
			console.error((err as Error).message);
		}
	};

	const active = plan?.active;
	const isSubscribed = session && session?.user?.priceId === plan?.priceId;

	const activeStyle = active && !isBilling
		? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
		: "bg-white text-[#1E3A8A] border-2 border-[#4F46E5] hover:bg-[#4F46E5] hover:text-white";

	// @ts-ignore
	return (
		<div
			className={`relative rounded-xl p-10 ${
				active && !isBilling
					? "bg-white border-2 border-[#4F46E5]"
					: "bg-white dark:bg-gray-800"
			}`}
		>
			{active && (
				<span
					className="absolute right-4 top-4 inline-flex rounded-full px-4 py-1 text-sm font-semibold bg-[#4F46E5] text-white">
                    Most Popular
                </span>
			)}

			<div className="mb-7 flex items-center gap-5">
				<div className={`flex h-18 w-full max-w-[72px] items-center justify-center rounded-xl ${
					active && !isBilling
						? "bg-[#4F46E5]/10"
						: "bg-[#4F46E5]/5"
				}`}>
					<Image
						src={isBilling && plan?.icon2 ? plan.icon2 : plan?.icon}
						alt={plan?.nickname}
						width={34}
						height={34}
					/>
				</div>
				<div>
                    <span className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                        {plan?.subtitle}
                    </span>
					<h3 className="text-2xl font-bold text-[#1E3A8A] dark:text-white">
						{plan.nickname}
					</h3>
				</div>
			</div>

			<p className="text-gray-600 dark:text-gray-300">
				{plan?.description}
			</p>

			<div className="my-6 h-px w-full bg-gray-200 dark:bg-gray-700"></div>

			<h4 className="mb-4.5 font-bold text-[44px] text-[#1E3A8A] dark:text-white">
				${plan?.unit_amount / 100}
				<span className="ml-1 text-xl font-medium text-gray-600 dark:text-gray-300">
                    /monthly
                </span>
			</h4>

			<h5 className="mb-7.5 text-lg font-bold text-[#1E3A8A] dark:text-white">
				What's included
			</h5>

			<ul className="flex flex-col gap-3">

				{plan?.includes.map((feature: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode> | null | undefined, key: Key | null | undefined) => (
					<li className="flex items-center gap-3" key={key}>
                        <span className="text-[#4F46E5]">
                            <svg
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
                                <path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M20.1668 11C20.1668 16.0626 16.0628 20.1667 11.0002 20.1667C5.93755 20.1667 1.8335 16.0626 1.8335 11C1.8335 5.9374 5.93755 1.83334 11.0002 1.83334C16.0628 1.83334 20.1668 5.9374 20.1668 11ZM14.6946 8.22221C14.9631 8.49069 14.9631 8.92599 14.6946 9.19448L10.1113 13.7778C9.84281 14.0463 9.40751 14.0463 9.13903 13.7778L7.30569 11.9445C7.03721 11.676 7.03721 11.2407 7.30569 10.9722C7.57418 10.7037 8.00948 10.7037 8.27797 10.9722L9.62516 12.3194L11.6738 10.2708L13.7224 8.22221C13.9908 7.95372 14.4261 7.95372 14.6946 8.22221Z"
									fill="currentColor"
								/>
                            </svg>
                        </span>
						<span className="text-gray-700 dark:text-gray-300">
                            {feature}
                        </span>
					</li>
				))}
			</ul>

			<button
				onClick={handleSubscription}
				className={`mt-9 flex w-full justify-center rounded-lg py-4 font-medium transition-all duration-200 ${
					isSubscribed
						? "bg-gray-200 text-gray-600 cursor-not-allowed"
						: activeStyle
				}`}
				//@ts-ignore
				disabled={isSubscribed}
			>
				{isSubscribed
					? "Current Plan"
					: isBilling
						? `Upgrade to ${plan?.nickname}`
						: "Get Started"
				}
			</button>
		</div>
	);
};

export default PriceItem;