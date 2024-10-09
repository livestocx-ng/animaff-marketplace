import {Blog, Product, Vendor} from '@/types/types';

export function formatBlogSlug(blog: Blog): string {
	const formattedName = blog.title.replace(/,/g, '');

	const formattedNameWithoutCommas = formattedName
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase();

	const slug = `${formattedNameWithoutCommas}_${blog.id}`;

	return slug.toLowerCase();
}

export function formatProductSlug(product: Product): string {
	const formattedProductName = product.name.replace(/,/g, '');

	const formattedProductNameWithoutCommas = formattedProductName
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase();

	const slug = `${formattedProductNameWithoutCommas}_${product.productId}`;

	return slug.toLowerCase();
}

export function formatVendorSlug(vendor: Vendor): string {
	return vendor?.slug.toLowerCase();
}

export function getProductIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}

export function getVendorIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}
