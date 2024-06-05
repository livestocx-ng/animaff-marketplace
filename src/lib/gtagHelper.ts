export const pageview = (url: string) => {
	window.gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`, {
		page_page: url,
	});
};
