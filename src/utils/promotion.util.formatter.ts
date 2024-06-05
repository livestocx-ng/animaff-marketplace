export function formatPromotionPlanTitle(title: string): string {
	let result = '';

	switch (title) {
		case 'WEEKLY':
			result = 'Weekly Plan';
		case 'TWO_WEEKS':
			result = 'Two Week Plan';
		case 'MONTHLY':
			result = 'Monthly Plan';
	}

	return result;
}

export function isDateInThePast(dateToCheck: Date | string): boolean {
	const date =
		typeof dateToCheck === 'string' ? new Date(dateToCheck) : dateToCheck;

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date format');
	}

	const currentDate = new Date();

	currentDate.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);

	return date < currentDate;
}

export function checkPromotionDaysRemaining(dateString: string): string {
	const targetDate = new Date(dateString);

	const today = new Date();

	today.setHours(0, 0, 0, 0);
	targetDate.setHours(0, 0, 0, 0);

	if (today > targetDate) {
		return 'Expired';
	} else {
		const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
		const daysRemaining = Math.ceil(
			(targetDate.getTime() - today.getTime()) / oneDay
		);
		return `${daysRemaining} days remaining`;
	}
}

export function generateRandomPaymentReference(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters to choose from
	const length = 12; // Length of the reference ID
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars[randomIndex];
	}

	// Get the current date and format it as YYYY-MM-DD
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}-${month}-${day}`;

	return `${formattedDate}_${result}`;
}
