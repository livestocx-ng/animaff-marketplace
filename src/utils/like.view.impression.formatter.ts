export function likesViewsImpressionFormatter(value: number): string {
	if (value < 0) {
		return '0';
	}

	if (value < 1000) {
		return value.toString();
	}

	const thousands = Math.floor(value / 1000);
	const remaining = value % 1000;

	if (remaining > 100) {
		return `${thousands}.${Math.floor(remaining / 100)}k`;
	} else {
		return `${thousands}k`;
	}
}
