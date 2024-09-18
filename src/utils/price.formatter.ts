export function PriceFormatter(price: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
}

export function formatSubscriptionDurationTitle(title: string): string {
	let result = '';

	switch (title) {
		case 'ONE_MONTH':
			result = '/month';
		case 'SIX_MONTHS':
			result = '/6 months';
		case 'ONE_YEAR':
			result = '/year';
	}

	return result;
}