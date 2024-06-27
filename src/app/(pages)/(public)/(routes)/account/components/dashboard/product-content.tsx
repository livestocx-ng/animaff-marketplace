'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import Image from 'next/image';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import {Badge} from '@/components/ui/badge';
import {PriceFormatter} from '@/utils/price.formatter';

interface ProductContentProps {
	// product: Product;
}

const ProductContent = ({}: ProductContentProps) => {
	const {product, updateCurrentAccountTab} = useGlobalStore();

	const isModalOpen = useProductMediaModalStore((state) => state.isOpen);
	const onModalOpen = useProductMediaModalStore((state) => state.onOpen);
	const updateProductModalPayload = useProductMediaModalStore(
		(state) => state.updatePayload
	);

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			<div className='flex items-center justify-between w-full'>
				<h1 className='font-medium text-xl'>{product?.name}</h1>

				<Badge
					variant='destructive'
					className='cursor-pointer'
					onClick={() => updateCurrentAccountTab('Products')}
				>
					Close
				</Badge>
			</div>

			<div className='flex flex-col gap-y-5 w-full'>
				<div className='flex flex-col md:flex-row items-start justify-between w-full'>
					<div className='w-full md:w-[45%] h-[400px] border rounded border-slate-400 relative'>
						<Image
							alt='product image'
							fill
							unoptimized={true}
							src={product?.media[0]?.mediaUrl!}
							className='object-fill h-full w-full'
						/>
					</div>

					<div className='w-full md:w-[55%] flex flex-col gap-y-5 md:pl-5'>
						<ProductRowText
							title='Product Name:'
							value={product?.name!}
						/>
						<ProductRowText
							title='Price:'
							value={PriceFormatter(product?.price!).toString()}
						/>
						<ProductRowText
							title='Discount Price:'
							value={PriceFormatter(
								product?.discountPrice!
							).toString()}
						/>
						<ProductRowText
							title='Media:'
							value={`${
								product?.media?.filter(
									(media) => media.mediaType === 'IMAGE'
								).length
							} images, ${
								product?.media?.filter(
									(media) => media.mediaType === 'VIDEO'
								).length
							} videos`}
						/>
						{/* <ProductRowText
							title='Description:'
							value={product?.description!}
						/> */}
						<ProductRowText
							title='Date uploaded:'
							value={product?.createdAt.slice(0, 10)!}
						/>
						<div className='w-full flex space-x-5 items-center justify-start'>
							<h1 className='font-medium text-sm'>Share on:</h1>
							<div className='flex space-x-2'>
								<WhatsappShareButton
									url={`https://animaff.com/marketplace/products/${product?.productId.toLowerCase()}`}
									title={`Check out my ${product?.name} on livestocx: `}
								>
									<WhatsappIcon size={30} round />
								</WhatsappShareButton>
								<FacebookShareButton
									url={`https://animaff.com/marketplace/products/${product?.productId.toLowerCase()}`}
									title={`Check out my ${product?.name} on livestocx: `}
								>
									<FacebookIcon size={30} round />
								</FacebookShareButton>
								<TwitterShareButton
									url={`https://animaff.com/marketplace/products/${product?.productId.toLowerCase()}`}
									title={`Check out my ${product?.name} on livestocx: `}
								>
									<TwitterIcon size={30} round />
								</TwitterShareButton>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full'>
					<h1 className='font-medium text-xl'>Description</h1>

					<p>{product?.description}</p>
				</div>

				<div className='w-full'>
					<h1 className='font-medium text-xl'>Images</h1>

					<div className='grid grid-cols-2 gap-5 md:gap-0 md:flex items-center justify-between w-full mt-4 rounded-lg '>
						{product?.media
							?.filter((media) => media.mediaType === 'IMAGE')
							?.slice(0, 6)
							.map((media, index) => (
								<div
									key={media.id}
									className='h-[150px] md:h-[150px] w-full md:w-[150px] border rounde border-slate-400 relative'
								>
									<Image
										fill
										alt={'product'}
										unoptimized={true}
										src={media.mediaUrl}
										onClick={() => {
											onModalOpen();

											updateProductModalPayload(
												product.media
											);
										}}
										className='object-fill h-full w-full cursor-pointer'
									/>

									{index === 5 && (
										<div
											onClick={() => {
												if (!isModalOpen) {
													onModalOpen();

													updateProductModalPayload(
														product.media
													);
												}
											}}
											className='absolute top-0 h-full w-full bg-[#11111190] flex items-center justify-center rounded-lg cursor-pointer'
										>
											<p className='text-xs text-center text-white'>
												See more images
											</p>
										</div>
									)}
								</div>
							))}
					</div>
				</div>

				<div>
					<h1 className='font-medium text-xl'>Videos</h1>

					<div className='flex items-center justify-start w-full mt-4 rounded-lg '>
						{product?.media?.filter(
							(media) => media.mediaType === 'VIDEO'
						).length === 0 && (
							<h1 className=''>
								No videos found for this product
							</h1>
						)}

						{product?.media
							?.filter((media) => media.mediaType === 'VIDEO')
							.map((media, index) => (
								<VideoToolTip
									key={index}
									videoUrl={media.mediaUrl}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductContent;

const ProductRowText = ({title, value}: {title: string; value: string}) => {
	return (
		<div className='grid grid-cols-2 w-full'>
			<h1 className='font-medium text-sm'>{title}</h1>
			<p className='text-sm'>{value}</p>
		</div>
	);
};

const VideoToolTip = ({videoUrl}: {videoUrl: string}) => {
	return (
		<div className='h-[250px] w-[45%]'>
			<video
				controls
				src={videoUrl}
				className='object-cover h-full w-full'
			/>
		</div>
	);
};
