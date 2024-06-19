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
