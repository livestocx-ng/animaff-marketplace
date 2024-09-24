import {Media} from '@/types/types';

interface CreateProductDto {
	price: string;
	name: string;
	discountPrice: string;
	description: string;
	category: string;
	media: File[];
	inStock: boolean;
	isNegotiable: boolean;
	zipPostalCode: string;
	isOrganicallyRaised: boolean;
	isHomeBred: boolean;
	isMeat: boolean;
	isPet: boolean;
	isPedigree: boolean;
	isNonPedigree: boolean;
}

interface UpdateProductDto {
	id: string;
	price: number;
	name: string;
	discountPrice: string;
	description: string;
	category: string;
	media: File[];
	existingMedia: Media[];
	inStock: boolean;
	isNegotiable: boolean;
	removedMediaIds: string[];
	zipPostalCode: string;
	isOrganicallyRaised: boolean;
	isHomeBred: boolean;
	isMeat: boolean;
	isPet: boolean;
	isPedigree: boolean;
	isNonPedigree: boolean;
}

interface ProductReviewDto {
	rating: number;
	description: string;
}

const isNumberRegEX = new RegExp(/^[0-9]+$/);

const zipPostalCodeRegEX = new RegExp(/^\d{4}$/);

export function ValidateCreateProductFormData(
	formData: CreateProductDto
): string {
	let message = '';

	if (!formData.category) {
		return (message = 'Product category is required.');
	}
	if (!formData.name) {
		return (message = 'Product name is required.');
	}
	if (!formData.price) {
		return (message = 'Product price is required.');
	}
	if (!isNumberRegEX.test(formData.price)) {
		return (message = 'Product price must be a number.');
	}
	if (formData.discountPrice && !isNumberRegEX.test(formData.discountPrice)) {
		return (message = 'Product discount price must be a number..');
	}
	if (!formData.zipPostalCode) {
		return (message = 'Product zip/postal code is required.');
	}
	if (!zipPostalCodeRegEX.test(formData.zipPostalCode)) {
		return (message = 'Product zip/postal code must be at least 4 digits.');
	}
	if (!formData.description) {
		return (message = 'Product description is required.');
	}
	if (formData.media.length == 0) {
		return (message = 'Product image|video is required');
	}
	if (!formData.media.some((file) => file.type.includes('image'))) {
		return (message = 'Product image is required');
	}

	return message;
}

export function ValidateUpdateProductFormData(
	formData: UpdateProductDto
): string {
	let message = '';

	if (!formData.category) {
		return (message = 'Product category is required.');
	}
	if (!formData.name) {
		return (message = 'Product name is required.');
	}
	if (!formData.price) {
		return (message = 'Product price is required.');
	}
	// if (!formData.discountPrice) {
	// 	return (message = 'Product discount price is required.');
	// }
	if (formData.discountPrice && !isNumberRegEX.test(formData.discountPrice)) {
		return (message = 'Product discount price must be a number..');
	}
	if (!formData.description) {
		return (message = 'Product description is required.');
	}

	return message;
}

export function ValidateProductReviewFormData(
	formData: ProductReviewDto
): string {
	let message = '';

	if (!formData.rating) {
		return (message = 'Review rating is required.');
	}

	if (!formData.description) {
		return (message = 'Review description is required.');
	}

	return message;
}
