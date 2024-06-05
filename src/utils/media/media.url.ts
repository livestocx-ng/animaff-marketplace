import {Product} from '../../types/types';

export function getMediaImageUrl(product: Product): string {
	const mediaUrl = product?.media?.find(
		(media) =>
			media.mediaUrl.includes('.jpeg') ||
			media.mediaUrl.endsWith('.jpg') ||
			media.mediaUrl.endsWith('.png')
	)?.mediaUrl!;

	if (mediaUrl) {
		return mediaUrl;
	} else {
		return `/animals/image__${product.category.toLowerCase()}.jpg`;
	}
}
