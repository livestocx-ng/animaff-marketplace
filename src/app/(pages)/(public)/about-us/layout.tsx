import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Animaff - About Us',
	description: 'Best deals, Everything Animals',
	keywords: ['Animaff', 'Livestock', 'United States', 'Pets', 'Animals', 'Meat'],
	other: {
		'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
	},
	openGraph: {
		title: 'Animaff - About Us',
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
		title: 'Animaff - About Us',
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
	return <>{children}</>;
}
