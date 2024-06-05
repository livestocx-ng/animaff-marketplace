import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Livestocx - Enterprise',
	description: 'Best deals, Everything Animals',
	keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
	openGraph: {
		images: [
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
		],
	},
};

export default function PricingLayout({children}: {children: React.ReactNode}) {
	return <>{children}</>;
}
