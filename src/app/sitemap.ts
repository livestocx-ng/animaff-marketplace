import {fetchSiteBlogs} from '@/lib/siteMapData';
import {formatBlogSlug, formatProductSlug} from '@/utils/slug.formatter';

export default async function sitemap() {
	const baseUrl = 'https://animaff.com';

	const blogs = await fetchSiteBlogs();

	const blogUrls = blogs?.map((blog) => {
		return {
			url: `${baseUrl}/blog/${formatBlogSlug(blog!)}`,
			lastModified: new Date(),
		};
	});

	console.log('[BLOG-URLS] :: ', blogUrls);

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/enterprise`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/pricing`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
		},
		...blogUrls,
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
