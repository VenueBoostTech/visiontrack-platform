export type Price = {
	priceId?: string;
	subscriptionId?: string;
	currentPeriodEnd?: Date;
	customerId?: string;
	isSubscribed?: boolean;
	isCanceled?: boolean;
	unit_amount: number;
	displayPrice?: string;
	nickname: string;
	description: string;
	subtitle: string;
	includes: string[];
	icon: string;
	icon2?: string;
	active?: boolean;
};
