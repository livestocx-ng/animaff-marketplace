import type {Metadata} from 'next';
import {generateOGImagesFromURLWithSizes} from '@/utils/og.image.generator';

export async function generateMetadata(): Promise<Metadata> {
	const imageUrl =
		'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png';
	const sizes = [
		{width: 144, height: 144},
		{width: 300, height: 157},
		{width: 200, height: 200},
		{width: 300, height: 200},
		{width: 300, height: 300},
		// {width: 1200, height: 630},
		// {width: 4096, height: 4096},
	];

	const ogImages = await generateOGImagesFromURLWithSizes(imageUrl, sizes);

	return {
		title: 'Animaff - Marketplace',
		description: 'Best deals, Everything Animals',
		keywords: ['Animaff', 'United States', 'Pets', 'Animals', 'Meat'],
		openGraph: {
			title: 'Animaff - Marketplace',
			description: 'Best deals, Everything Animals',
			url: 'https://animaff.com',
			siteName: 'Animaff',
			type: 'website',
			images: ogImages,
		},
		twitter: {
			card: 'summary',
			site: '@animaff',
			creator: '@animaff',
			title: 'Animaff - Marketplace',
			description: 'Best deals, Everything Animals',
			images: ogImages,
		},
	};
}

export default function Layout({children}: {children: React.ReactNode}) {
	return <>{children} </>;
}
