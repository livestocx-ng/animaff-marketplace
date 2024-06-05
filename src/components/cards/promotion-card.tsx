import React from 'react';
import {Promotion} from '@/types/types';
import {
	isDateInThePast,
	formatPromotionPlanTitle,
} from '@/utils/promotion.util.formatter';
import {useGlobalStore} from '@/store/use-global-store';

interface PromotionCardProps {
	promotion: Promotion;
}

const PromotionCard = ({promotion}: PromotionCardProps) => {
	const {updateShowPromotionInfo, updateCurrentPromotion} = useGlobalStore();

	return (
		<div
			onClick={() => {
				updateShowPromotionInfo(true);
				updateCurrentPromotion(promotion);
			}}
			className={`border shadow-md ${
				isDateInThePast(promotion.expiration_date)
					? 'border-slate-100 shadow-slate-300'
					: 'border-green-100 shadow-green-200'
			} rounded-md p-3 mb-3 grid grid-cols-2 gap-10 w-full sm:w-fit cursor-pointer transition-all hover:translate-x-1 duration-700`}
		>
			<div className='flex flex-col space-y-5'>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Duration</h1>
					<p className='text-xs'>
						{formatPromotionPlanTitle(promotion.plan.duration)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Products Promoted</h1>
					<p className='text-xs'>{promotion.products.length}</p>
				</div>
			</div>

			<div className='flex flex-col space-y-5'>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Subscription Date</h1>
					<p className='text-xs'>
						{promotion.subscription_date.toString().slice(0, 10)}
					</p>
				</div>
				<div className='space-y-2'>
					<h1 className='text-xs font-semibold'>Expiration Date</h1>
					<p className='text-xs'>
						{promotion.expiration_date.toString().slice(0, 10)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PromotionCard;
