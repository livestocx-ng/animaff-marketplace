import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Animaff - Best deals, Everything Animals',
	description: 'Best deals, Everything Animals',
	keywords: ['Animaff', 'United States', 'Pets', 'Animals', 'Meat'],
	openGraph: {
		title: 'Animaff - Enterprise',
		description: 'Best deals, Everything Animals',
		url: 'https://animaff.com',
		siteName: 'Animaff',
		type: 'website',
		images: [
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Animaff Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Animaff Banner',
			},
		],
	},
	twitter: {
		card: 'summary',
		site: '@animaff',
		creator: '@animaff',
		title: 'Animaff',
		description: 'Best deals, Everything Animals',
		images: [
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Animaff Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Animaff Banner',
			},
		],
	},
};

export default function Layout({children}: {children: React.ReactNode}) {
	return <>{children} </>;
}
