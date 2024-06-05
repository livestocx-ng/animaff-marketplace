'use client';
import {useGlobalStore} from '@/hooks/use-global-store';
import PromotionPlansContent from '@/components/promotions/promotion-plans-content';
import UserPromotionsContent from '@/components/promotions/user-promotions-content';

const PromotionsContent = () => {
	const {userPromotionPlan} = useGlobalStore();

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			{!userPromotionPlan ? (
				<PromotionPlansContent />
			) : (
				<UserPromotionsContent />
			)}
		</div>
	);
};

export default PromotionsContent;

// EMPTY CONTENT
{
	/* <div className='flex flex-col items-center justify-center py-20'>
	<Image
		alt='logo'
		width={150}
		height={150}
		unoptimized={true}
		src={'/logo.svg'}
		className='opacity-50'
	/>
</div> */
}
