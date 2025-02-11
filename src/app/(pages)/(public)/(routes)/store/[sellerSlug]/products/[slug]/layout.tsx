import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import {getMediaImageUrl} from '@/utils/media/media.url';
import {getProductIdFromSlug} from '@/utils/slug.formatter';
import {generateOGImageFromURL} from '@/utils/og.image.generator';

interface ProductDescriptionLayoutProps {
	params: {
		slug: string;
	};
	children: React.ReactNode;
}

export async function generateMetadata(
	{params}: ProductDescriptionLayoutProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// console.log('SLUG ', params.slug);

	let ogImage200x200 = '';
	let ogImage300x200 = '';
	let ogImage300x300 = '';

	const {data} = await axios.get(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}/user/products/product/${getProductIdFromSlug(params.slug!)}`
	);

	const imageUrl = getMediaImageUrl(data.data);

	if (imageUrl.includes('https')) {
		ogImage200x200 = await generateOGImageFromURL(200, 200, imageUrl);
		ogImage300x200 = await generateOGImageFromURL(300, 200, imageUrl);
		ogImage300x300 = await generateOGImageFromURL(300, 300, imageUrl);
	}

	return {
		title: data.data.name,
		openGraph: {
			images: [
				{
					url: ogImage200x200,
					secureUrl: ogImage200x200,
					width: 200,
					height: 200,
				},
				{
					url: ogImage300x200,
					secureUrl: ogImage300x200,
					width: 300,
					height: 200,
				},
				{
					url: ogImage300x300,
					secureUrl: ogImage300x300,
					width: 300,
					height: 300,
				},
			],
		},
		twitter: {
			images: [
				{
					url: ogImage200x200,
					secureUrl: ogImage200x200,
					width: 200,
					height: 200,
				},
				{
					url: ogImage300x200,
					secureUrl: ogImage300x200,
					width: 300,
					height: 200,
				},
				{
					url: ogImage300x300,
					secureUrl: ogImage300x300,
					width: 300,
					height: 300,
				},
			],
		},
	};
}

export default function RootLayout({children}: ProductDescriptionLayoutProps) {
	return <div>{children}</div>;
}
