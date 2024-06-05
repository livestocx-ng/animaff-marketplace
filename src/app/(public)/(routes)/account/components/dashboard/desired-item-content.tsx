'use client';
import Image from 'next/image';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/store/use-global-store';
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import axios, {AxiosError} from 'axios';
import {Badge} from '@/components/ui/badge';
import {PriceFormatter} from '@/utils/price.formatter';
import {useEffect} from 'react';
import {DesiredItemInfo} from '@/types/types';
import {Button} from '@/components/ui/button';

const DesiredItemContent = () => {
	const {
		desiredProductInfo,
		user,
		product,
		updateCurrentAccountTab,
		updateDesiredProductInfo,
	} = useGlobalStore();

	const isModalOpen = useProductMediaModalStore((state) => state.isOpen);
	const onModalOpen = useProductMediaModalStore((state) => state.onOpen);
	const updateProductModalPayload = useProductMediaModalStore(
		(state) => state.updatePayload
	);

	const fetchDesiredProductInfo = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/fetch-desired-product-info?productId=${product?.productId}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data.data);

			updateDesiredProductInfo(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-DESIRED-PRODUCT-INFO-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchDesiredProductInfo();
	}, []);

	return (
		<div className='w-[78%] flex flex-col gap-5'>
			<div className='flex items-center justify-between w-full'>
				<h1 className='font-medium text-xl'>{product?.name}</h1>

				<Badge
					variant='destructive'
					className='cursor-pointer'
					onClick={() => updateCurrentAccountTab('Desired Items')}
				>
					Close
				</Badge>
			</div>

			<div className='flex flex-col gap-y-5 w-full'>
				<div className='flex items-start justify-between w-full'>
					<div className='w-[45%] h-[400px] border rounded border-slate-400 relative'>
						<Image
							alt='product image'
							fill
							unoptimized={true}
							src={product?.media[0]?.mediaUrl!}
							className='object-fill h-full w-full'
						/>
					</div>

					<div className='w-[55%] flex flex-col gap-y-5 pl-5'>
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

						<ProductRowText
							title='Date uploaded:'
							value={product?.createdAt.slice(0, 10)!}
						/>

						<ProductContactAlertDialog
							productInfo={desiredProductInfo}
						/>

						<Button
							type='button'
							variant={'outline'}
							onClick={async () => {
								await axios.get(
									`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-user-to-contact-seller?product=${product?.id}`,
									{
										headers: {
											Authorization: user?.accessToken,
										},
									}
								);

								const chatLink = `https://wa.me/+234${desiredProductInfo?.phoneNumber}`;

								window.open(chatLink, '_blank');
							}}
							className='border-main text-main text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
						>
							Chat with Seller
						</Button>
					</div>
				</div>

				<div>
					<h1 className='font-medium text-xl'>Description</h1>

					<p>{product?.description}</p>
				</div>

				<div>
					<h1 className='font-medium text-xl'>Images</h1>

					<div className='grid grid-cols-2 gap-5 md:gap-0 md:flex items-center justify-between w-full mt-4 rounded-lg px-4 md:px-0'>
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

					<div className='flex items-center justify-start w-full mt-4 rounded-lg px-4 md:px-0'>
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

export default DesiredItemContent;

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

const ProductContactAlertDialog = ({
	productInfo,
}: {
	productInfo: DesiredItemInfo | null;
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='border border-main text-main font-medium text-xs h-10 w-[45%] rounded-full py-2'>
				Contact
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{productInfo?.name!}</AlertDialogTitle>
					<AlertDialogDescription className='flex flex-col py-5 text-black'>
						<div className='relative w-[150px] h-[150px] mx-auto border'>
							<Image
								fill
								alt=''
								unoptimized={true}
								src={productInfo?.avatar!}
								className='object-fill w-full h-full'
							/>
						</div>
						<div className='grid grid-cols-2 gap-y-5 pt-2'>
							<p className='font-medium text-sm'>Email</p>
							<p>{productInfo?.email}</p>
							<p className='font-medium text-sm'>
								Contact number
							</p>
							<p>{productInfo?.phoneNumber}</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
