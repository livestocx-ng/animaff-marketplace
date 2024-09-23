export function PriceFormatter(price: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
}

export function formatSubscriptionDurationTitle(title: string): string {
	let result = '';

	if (title === 'ONE_MONTH') {
		return (result = '/month');
	}

	if (title === 'SIX_MONTHS') {
		return (result = '/6 months');
	}

	if (title === 'ONE_YEAR') {
		return (result = '/year');
	}

	return result;
}
