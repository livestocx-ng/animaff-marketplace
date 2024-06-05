'use client';
import Image from 'next/image';
import {Product} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/store/use-global-store';
import {ShoppingCartIcon, ThumbsDown, ThumbsUp} from 'lucide-react';

interface ProductCardProps {
	product: Product | null;
}

const MarketPlaceProductCard = ({product}: ProductCardProps) => {
	const router = useRouter();

	const {user, updateProduct} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const handleLikeUnlikeProduct = async (formData: {value?: boolean}) => {
		try {
			setLoading(true);

			// console.log('[LIKE-UNLIKE-PRODUCT-PAYLOAD] :: ', formData);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/like-unlike-product?productId=${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[LIKE-UNLIKE-PRODUCT-SUCCESS] :: ', data);

			setLoading(false);

			updateProduct(product?.id!, data.data);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[ERROR] :: ', _error);
		}
	};

	return (
		<div
			// href={`${product.productId}`}
			// onClick={() => {
			// 	router.push('/U9IKL9101');
			// }}
			className='w-[140px] sm:w-[180px] flex flex-col justify-between shadow__1 rounded'
		>
			<div
				// href={`${product?.productId}`}
				onClick={() => {
					router.push(
						`/marketplace/products/${product?.productId!.toLowerCase()}`
					);
				}}
				className='h-[120px] sm:h-[160px] relative rounded-t cursor-pointer'
			>
				<Image
					fill
					alt='product'
					unoptimized={true}
					src={product?.media[0]?.mediaUrl!}
					className='object-cover rounded-t'
				/>

				{product?.isNegotiable === true && (
					<div className='absolute top-0 left-0 bg-[#11111180] px-4 rounded-tl'>
						<p className='text-[10px] text-white'>Negotiable</p>
					</div>
				)}

				{user && (
					<div
						onClick={() => {
							if (loading) return;

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
						className='absolute right-14 -bottom-[14px] z-[3] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full cursor-pointer'
					>
						{product?.likedUsers?.includes(parseInt(user?.id!)) ? (
							<ThumbsDown className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
						) : (
							<ThumbsUp className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
						)}
					</div>
				)}

				{user && (
					<div className='absolute right-4 -bottom-[14px] z-[3] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full'>
						<ShoppingCartIcon className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
					</div>
				)}
			</div>

			<div className='flex flex-col justify-end bg-orange-100 px-1 sm:px-2 py-6 rounded-b relative'>
				{/* <div className='text-xs text-right sm:text-xs font-medium border-b border-t-black'>
					{product?.vendor?.name}
				</div> */}
				<div className='text-xs sm:text-sm font-semibold'>
					{product?.name}
				</div>
				<div className='text-xs sm:text-sm text-main font-medium'>
					{PriceFormatter(product?.price!)}
				</div>
			</div>
		</div>
	);
};

export default MarketPlaceProductCard;
