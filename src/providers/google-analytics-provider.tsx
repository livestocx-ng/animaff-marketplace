'use client';
import {useEffect} from 'react';
import Script from 'next/script';
import {pageview} from '@/lib/gtagHelper';
import {usePathname, useSearchParams} from 'next/navigation';

export default function GoogleAnalyticsProvider() {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const url = pathName + searchParams.toString();

		pageview(url);
	}, [pathName, searchParams]);

	return (
		<>
			{' '}
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
			/>
			<Script
				id='google-analytics'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            
                            gtag('consent', 'default', {
                                'analytics_storage': 'denied'
                            })

                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
				}}
			/>
		</>
	);
}

// gtag('consent', 'update', {
//     'analytics_storage': 'granted'
// })