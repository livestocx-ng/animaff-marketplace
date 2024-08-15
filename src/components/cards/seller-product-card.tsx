'use client';
import {
	Award,
	MapPin,
	Forward,
	ThumbsUp,
	ThumbsDown,
	MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
	useGlobalStore,
	useShareProductModalStore,
} from '@/hooks/use-global-store';
import {Product} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useInView} from 'react-intersection-observer';
import {PriceFormatter} from '@/utils/price.formatter';
import {getMediaImageUrl} from '@/utils/media/media.url';
import {formatProductSlug} from '@/utils/slug.formatter';

interface SellerProductCardProps {
	product: Product | null;
}

const SellerProductCard = ({product}: SellerProductCardProps) => {
	const router = useRouter();

	const shareProductModal = useShareProductModalStore();
	const {
		user,
		vendorProfile,
		updateProduct,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	const {ref, inView} = useInView();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		handleProductInView(inView);
	}, [inView]);

	const handleProductInView = (inView: boolean) => {
		setTimeout(async () => {
			if (inView) {
				await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-impression`,
					{
						productId: parseInt(product?.id!),
					}
				);
			}
		}, 3500);
	};

	const handleShareProductModal = () => {
		shareProductModal.updatePayload(product!);

		shareProductModal.onOpen();
	};

	const handleLikeUnlikeProduct = async (formData: {value?: boolean}) => {
		try {
			setLoading(true);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/like-unlike-product?productId=${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			updateProduct(product?.id!, data.data);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;
		}
	};

	const handleMessageSeller = async () => {
		try {
			if (loading) return;

			if (!user) return router.push(`/signin`);

			if (user?.id === product?.user.toString()) return;

			await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-user-to-contact-seller?product=${product?.id}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${product?.user}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updateChatConversation(data.data);

			router.push('/account');

			updateCurrentAccountTab('Messages');

			updateShowChatConversation(true);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[ERROR] :: ', _error);
		}
	};

	return (
		<div
			ref={ref}
			className='w-[48%] sm:w-[150px] flex flex-col justify-between shadow__1 relative'
		>
			<Link
				// onClick={() => {
				// 	return router.push(
				// 		`/store/${vendorProfile?.slug}/products/${formatProductSlug(product!)}`
				// 	);
				// }}
				prefetch
				className='h-[180px] relative cursor-pointer'
				href={`/store/${
					vendorProfile?.slug
				}/products/${formatProductSlug(product!)}`}
			>
				<Image
					fill
					alt='product'
					unoptimized={true}
					src={getMediaImageUrl(product!)}
					className='object-cover rounded-t-md'
				/>

				{product?.likeCount !== 0 && (
					<div className='absolute bottom-0 left-0 bg-[#11111180] px-4 rounded-tl-md'>
						<p className='text-[8px] text-white'>
							{product?.likeCount}{' '}
							{product?.likeCount == 1 ? 'Like' : 'Likes'}
						</p>
					</div>
				)}

				{product?.isPromotion && (
					<div className='absolute top-0 right-0 bg-green-500 px-1 py-1 rounded-md shadow-lg shadow-slate-500'>
						<Award className='text-white' size={16} />
					</div>
				)}

				{product?.isNegotiable === true && (
					<div className='absolute top-0 left-0 bg-[#11111180] px-1 rounded-tl-md'>
						<p className='text-[8px] text-white'>Negotiable</p>
					</div>
				)}

				{product?.inStock === false && (
					<div className='absolute bottom-0 right-0 bg-[#b21e1ec6] px-1'>
						<p className='text-[8px] text-white'>Out Of Stock</p>
					</div>
				)}
			</Link>

			<div className='flex flex-col justify-between bg-orange-100 border border-t-0 border-slate-400 py-2 relative h-[160px] rounded-b-md'>
				<div className='space-y-1'>
					<div className='flex justify-between items-center px-2'>
						<div
							onClick={() => {
								if (loading) return;

								if (!user) return router.push('/signin');

								const formData: {value?: boolean} = {};
								if (
									product?.likedUsers?.includes(
										parseInt(user?.id!)
									)
								) {
									formData.value = false;
								} else {
									formData.value = true;
								}

								handleLikeUnlikeProduct(formData);
							}}
							className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-main rounded-full cursor-pointer'
						>
							{product?.likedUsers?.includes(
								parseInt(user?.id!)
							) ? (
								<ThumbsDown className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
							) : (
								<ThumbsUp className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
							)}
						</div>

						<div
							onClick={handleMessageSeller}
							className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-main rounded-full cursor-pointer'
						>
							<MessageCircle className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
						</div>

						<div
							onClick={handleShareProductModal}
							className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-main rounded-full cursor-pointer'
						>
							<Forward className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
						</div>
					</div>

					<div className='text-xs sm:text-s font-semibold px-2'>
						{product?.name.length! > 15
							? `${product?.name.slice(0, 15)}...`
							: product?.name}
					</div>
					{product?.isNegotiable && (
						<div className='text-xs sm:text-s text-main font-medium px-2'>
							{PriceFormatter(product?.discountPrice!)}
						</div>
					)}
					<div
						className={`text-xs sm:text-s font-medium px-2 ${
							product?.isNegotiable
								? 'line-through text-slate-500'
								: 'text-main'
						}`}
					>
						{PriceFormatter(product?.price!)}
					</div>
				</div>

				<div>
					{product?.isPromotion && (
						<p className='flex justify-end text-[8px] text-green-500 font-medium pr-2'>
							Promoted
						</p>
					)}

					<div className='border-t border-slate-400 text-[8px] font-medium px-2 pt-1 flex items-center space-x-2'>
						<MapPin className='h-3 w-3 text-black' />
						<p className='text-[8px]'>
							{product?.vendor?.city}, {product?.vendor?.state}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerProductCard;
