import axios from 'axios';
import * as AWS from 'aws-sdk';
import {default as Jimp} from 'jimp';

interface ImageSize {
	width: number;
	height: number;
}

interface OGImageResponse {
	url: string;
	width: number;
	height: number;
}

const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESSKEY! as string,
	secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETKEY! as string,
	region: process.env.NEXT_PUBLIC_AWS_S3_REGION! as string,
});

const MediaIdGenerator = (len: number) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let id = 'LVSCX-MEDIA-';

	for (let i = 0; i < len; i++) {
		id += characters[Math.floor(Math.random() * characters.length)];
	}

	return id.toLocaleLowerCase();
};

export async function generateOGImageFromURL(
	width: number,
	height: number,
	imageURL: string
): Promise<string> {
	try {
		const response = await axios.get(imageURL, {
			responseType: 'arraybuffer',
		});
		const imageData = Buffer.from(response.data, 'binary');

		const resizedImage = await Jimp.read(imageData);
		resizedImage.resize(width, height).cover(width, height);

		const imageBuffer: Buffer = await resizedImage.getBufferAsync(
			Jimp.MIME_PNG
		);

		const fileName = MediaIdGenerator(14) + '.png';

		const params = {
			Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET! as string,
			Key: 'seo-images/' + fileName,
			Body: imageBuffer,
			ACL: 'public-read-write',
			ContentType: 'image/png',
			ContentDisposition: 'inline',
			CreateBucketConfiguration: {
				LocationConstraint: process.env
					.NEXT_PUBLIC_AWS_S3_REGION! as string,
			},
		};

		const fileUploadResponse: AWS.S3.ManagedUpload.SendData = await s3
			.upload(params)
			.promise();

		// console.table(fileUploadResponse);

		return fileUploadResponse.Location;
	} catch (error) {
		console.error('Error while generating SEO OG:image :: ', error);

		return '';
	}
}

export async function generateOGImagesFromURLWithSizes(
	imageURL: string,
	sizes: ImageSize[],
	quality: number = 80
): Promise<OGImageResponse[]> {
	try {
		const s3 = new AWS.S3({
			accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESSKEY!,
			secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETKEY!,
			region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
		});

		const response = await axios.get(imageURL, {
			responseType: 'arraybuffer',
		});
		const imageData = Buffer.from(response.data, 'binary');
		const image = await Jimp.read(imageData);

		const uploadPromises = sizes.map(async ({width, height}) => {
			const resizedImage = image.clone();
			resizedImage
				.resize(width, height)
				.cover(width, height)
				.quality(quality);

			const imageBuffer = await resizedImage.getBufferAsync(
				Jimp.MIME_PNG
			);
			const fileName = MediaIdGenerator(14) + '.png';

			const params = {
				Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET!,
				Key: `seo-images/${fileName}`,
				Body: imageBuffer,
				ACL: 'public-read-write',
				ContentType: 'image/png',
				ContentDisposition: 'inline',
				CreateBucketConfiguration: {
					LocationConstraint: process.env
						.NEXT_PUBLIC_AWS_S3_REGION! as string,
				},
			};

			const fileUploadResponse = await s3.upload(params).promise();

			return {
				url: fileUploadResponse.Location,
				width,
				height,
			};
		});

		const uploadedImages = await Promise.all(uploadPromises);

		return uploadedImages;
	} catch (error) {
		console.error('Error while generating SEO OG:image :: ', error);
		return [];
	}
}
