import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Animaff - Enterprise',
	description: 'Best deals, Everything Animals',
	keywords: ['Livestock', 'United States', 'Animals', 'Meat', 'Pets'],
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
