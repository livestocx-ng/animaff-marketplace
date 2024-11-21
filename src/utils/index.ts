import {Product, GridItem, ProductUploadSubscription, Testimonial} from '@/types/types';

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


export function createGridItems(
	products: Product[],
	testimonials: Testimonial[],
	interval: number
): GridItem[] {
	const gridItems: GridItem[] = [];
	let testimonialIndex = 0;

	products.map((product, index) => {
		// Add the product as a GridItem
		gridItems.push({
			type: 'product',
			id: product.id,
			product: product,
		});

		// After every `interval` products, add a testimonial if available
		if (
			(index + 1) % interval === 0 &&
			testimonialIndex < testimonials.length
		) {
			gridItems.push({
				type: 'testimonial',
				id: testimonials[testimonialIndex].id,
				testimonial: testimonials[testimonialIndex],
			});
			testimonialIndex++;
		}
	});

	return gridItems;
}
