import Image from 'next/image';
import React, {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {
	formatPromotionPlanTitle,
	checkPromotionDaysRemaining,
} from '@/utils/promotion.util.formatter';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/store/use-global-store';
import {getMediaImageUrl} from '@/utils/media/media.url';

const PromotionInfoContent = () => {
	const {
		user,
		currentPromotion,
		promotionInfoProducts,
		updateCurrentPromotion,
		updateShowPromotionInfo,
		updatePromotionInfoProducts,
	} = useGlobalStore();

	const fetchPromotionProductsInfo = async () => {
		try {
			const productIds = `[${[...currentPromotion?.products!]}]`;
			console.log('[PRODUCT-IDS] :: ', productIds);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/promotions/products-info?productIds=${productIds}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePromotionInfoProducts(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchPromotionProductsInfo();
	}, []);

	return (
		<div className='flex flex-col'>
			<div className='flex justify-end mb-2'>
				<div
					onClick={() => {
						updateCurrentPromotion(null);
						updateShowPromotionInfo(false);
						updatePromotionInfoProducts([]);
					}}
					className='border border-red-400 text-red-400 rounded-full p-1 text-xs cursor-pointer'
				>
					Close
				</div>
			</div>

			<div className='flex flex-wrap gap-8'>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Duration</h1>
					<p className='text-xs'>
						{formatPromotionPlanTitle(
							currentPromotion?.plan.duration!
						)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Products Promoted</h1>
					<p className='text-xs'>
						{currentPromotion?.products.length}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Subscription Date</h1>
					<p className='text-xs'>
						{currentPromotion
							?.subscription_date!.toString()
							.slice(0, 10)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Days Remaining</h1>
					<p className='text-xs'>
						{checkPromotionDaysRemaining(
							currentPromotion?.expiration_date!.toString()!
						)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Expiration Date</h1>
					<p className='text-xs'>
						{currentPromotion
							?.expiration_date!.toString()
							.slice(0, 10)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Payment Date</h1>
					<p className='text-xs'>
						{currentPromotion
							?.payment_date!.toString()
							.slice(0, 10)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Payment Reference</h1>
					<p className='text-xs'>
						{currentPromotion?.payment_reference}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Amount Paid</h1>
					<p className='text-xs'>
						{PriceFormatter(currentPromotion?.amount_paid!)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Payment Gateway</h1>
					<p className='text-xs'>
						{currentPromotion?.payment_method}
					</p>
				</div>
			</div>

			{promotionInfoProducts?.length > 0 && (
				<div className='flex flex-col mt-5 space-y-2'>
					<h1 className='text-xs font-semibold'>
						Promoted Products({promotionInfoProducts.length})
					</h1>

					<div className='flex flex-wrap gap-8'>
						{promotionInfoProducts?.map((product) => (
							<div
								key={product.id}
								className='rounded-md bg-green-50 p-2 flex items-center space-x-10'
							>
								<div className='flex items-center space-x-2'>
									<div className='w-[80px] h-[60px] rounded-md relative'>
										<Image
											fill
											alt=''
											src={getMediaImageUrl(product!)}
											className='object-cover rounded-md'
										/>
									</div>

									<div className='space-y-1'>
										<h1 className='text-xs font-medium'>
											{product?.name}
										</h1>
										<p className='text-xs capitalize'>
											{product?.category.toLowerCase()}
										</p>
									</div>
								</div>

								<p className='text-xs'>
									{product?.isNegotiable
										? PriceFormatter(product?.discountPrice)
										: PriceFormatter(product?.price)}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default PromotionInfoContent;
