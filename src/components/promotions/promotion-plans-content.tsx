import {Button} from '../ui/button';
import React, {useState} from 'react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import ButtonLoader from '../loader/button-loader';
import {useGlobalStore} from '@/store/use-global-store';
import PromotionPlanCard from '../cards/promotion-plan-card';

const PromotionPlansContent = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const {
		user,
		promotionPlans,
		currentPromotionPlan,
		updateUserPromotionPlan,
	} = useGlobalStore();

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/promotions/update-plan?plan=${currentPromotionPlan}`,
				{},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updateUserPromotionPlan(data.data);

			toast.success('Promotion plan updated successfully.');

			setLoading(false);
		} catch (error) {
			const _error = error as AxiosError;

			setLoading(false);

			toast.error('An error occurred.');
		}
	};

	return (
		<div className='w-full flex flex-col'>
			<h1 className='text-center font-medium'>Select a Plan</h1>

			<div className='my-5 mx-auto'>
				{loading ? (
					<Button
						type='button'
						className={`bg-green-600 hover:bg-green-700 text-white h-12 w-[300px] mx-auto rounded-md py-4`}
					>
						<ButtonLoader />
					</Button>
				) : (
					<Button
						type='button'
						onClick={handleSubmit}
						disabled={currentPromotionPlan === 0}
						className={`${
							currentPromotionPlan === 0
								? 'bg-slate-600 hover:bg-slate-600'
								: 'bg-green-600 hover:bg-green-700'
						} text-white h-12 w-[300px] mx-auto rounded-md py-4`}
					>
						Continue
					</Button>
				)}
			</div>

			<div className='flex flex-col mx-auto space-y-5'>
				{promotionPlans
					.sort((a, b) => a.position - b.position)
					?.map((plan) => (
						<PromotionPlanCard key={plan.id} plan={plan} />
					))}
			</div>
		</div>
	);
};

export default PromotionPlansContent;
