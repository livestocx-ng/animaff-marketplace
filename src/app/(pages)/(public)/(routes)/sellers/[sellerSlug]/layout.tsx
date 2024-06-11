import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import {generateOGImageFromURL} from '@/utils/og.image.generator';
import {formatVendorSlug, getVendorIdFromSlug} from '@/utils/slug.formatter';

interface SellerProfileLayoutProps {
	params: {
		sellerSlug: string;
	};
	children: React.ReactNode;
}

export async function generateMetadata(
	{params}: SellerProfileLayoutProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	console.log('SLUG ', params.sellerSlug);

	let ogImage = '';

	const {data} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/${getVendorIdFromSlug(
			params.sellerSlug
		)}`
	);

	// console.log('[SEO-SELLER-DATA] :: ', data);

	const imageUrl = data.data.avatar;

	if (imageUrl.includes('https')) {
		ogImage = await generateOGImageFromURL(
			imageUrl,
			formatVendorSlug(data.data)
		);
	}

	return {
		title: `Animaff - ${data.data.name}`,
		openGraph: {
			images: [
				{
					url: ogImage,
					secureUrl: ogImage,
					width: 300,
					height: 200,
				},
			],
		},
	};
}

export default function RootLayout({children}: SellerProfileLayoutProps) {
	return <div>{children}</div>;
}
