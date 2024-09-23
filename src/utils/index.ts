import {ProductUploadSubscription} from '@/types/types';

export function subscriptionPlanDurationFormatter(duration: string): string {
	let result = '';

	switch (duration) {
		case 'ONE_MONTH':
			result = '1 Month';
			break;
		case 'THREE_MONTHS':
			result = '3 Months';
			break;
		case 'SIX_MONTHS':
			result = '6 Months';
			break;
		case 'ONE_YEAR':
			result = '1 Year';
			break;
		default:
			result = '';
	}

	return result;
}

interface CountDownResult {
	isWithinRange: boolean;
	remainingDays: number;
}

export function checkProductUploadSubscriptionExpiration(
	userProductUploadSubscription: ProductUploadSubscription | null
): CountDownResult {
	if (userProductUploadSubscription === null) {
		return {
			isWithinRange: false,
			remainingDays: 0,
		};
	}

	const today = new Date();
	const expirationDate = new Date(
		userProductUploadSubscription.expiration_date
	);

	const timeDifference = expirationDate.getTime() - today.getTime();

	const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

	return {
		isWithinRange: remainingDays >= 1 && remainingDays <= 10,
		remainingDays: Math.max(remainingDays, 0),
	};
}
