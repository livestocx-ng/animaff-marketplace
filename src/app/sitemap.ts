import {fetchSiteProducts} from '@/lib/siteMapData';
import {formatProductSlug} from '@/utils/slug.formatter';

export default async function sitemap() {
	const baseUrl = 'https://animaff.com';

	// const products = await fetchSiteProducts();

	// const productUrls = products?.map((product) => {
	// 	return {
	// 		url: `${baseUrl}/marketplace/products/${formatProductSlug(
	// 			product!
	// 		)}`,
	// 		lastModified: new Date(product.createdAt),
	// 	};
	// });

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/terms-of-service`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/contact-us`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/about-us`,
			lastModified: new Date(),
		},
		// ...productUrls,
	];
}
