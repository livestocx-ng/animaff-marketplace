import {X} from 'lucide-react';
import {
	useGlobalStore,
	useProductUploadSubscriptionModalStore,
} from '@/hooks/use-global-store';
import React, {useState} from 'react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {PriceFormatter} from '@/utils/price.formatter';
import ButtonLoader from '@/components/loader/button-loader';
import {subscriptionPlanDurationFormatter} from '@/utils';

const ProductUploadSubscriptionModal = () => {
	const router = useRouter();

	const modal = useProductUploadSubscriptionModalStore();
	const {
		user,
		userProductUploadSubscription,
		productUploadSubscriptionPlans,
	} = useGlobalStore();

	const [loading, setLoading] = useState(false);
	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-20'>
			<div className='flex flex-col w-[90%] lg:w-[40%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto rounded-md scrollbar__1'>
				<div className='flex items-center justify-between px4 w-full'>
					<h1 className='font-medium text-sm'></h1>

					<Button
						type='button'
						disabled={loading}
						onClick={() => modal.onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly gap-y-10 w-full py-5 px-4 md:px-8 lg:px-0 mb-2'>
					{productUploadSubscriptionPlans?.map((plan, index) => (
						<div
							key={plan.id}
							className={`flex flex-col items-center space-y-5 border rounded-md py-12 px-6 w-full md:w-[400px] hover:scale-105 transition-all duration-700 border-slate-300 shadow-xl shadow-slate-300`}
						>
							<h1 className='text-2xl font-medium'>
								{plan.title}
							</h1>
							<h1 className='text-sm'>{plan.description}</h1>
							<h1 className='text-lg font-semibold'>
								{PriceFormatter(plan.price)} /{' '}
								{subscriptionPlanDurationFormatter(
									plan.duration
								)}
							</h1>

							{loading && currentPlan.id === plan.id ? (
								<Button
									type='button'
									disabled={true}
									className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
										plan.duration === 'ONE_MONTH'
											? 'bg-green-400 hover:bg-green-500'
											: plan.duration === 'THREE_MONTHS'
											? 'bg-sky-500 hover:bg-sky-600'
											: plan.duration === 'SIX_MONTHS'
											? 'bg-indigo-400 hover:bg-indigo-500'
											: 'bg-sky-600 hover:bg-sky-700'
									}`}
								>
									<ButtonLoader />
								</Button>
							) : (
								<>
									{currentPlan.id !== 0 &&
									plan.id === currentPlan.id ? (
										<Button
											type='button'
											disabled={loading}
											onClick={async () => {
												if (!user) {
													return router.push(
														'/signin'
													);
												}

												try {
													setLoading(true);

													const {data} =
														await axios.post(
															`${process.env.NEXT_PUBLIC_API_URL}/payments/initialize-product-upload-subscription-payment?plan=${currentPlan.id}`,
															{},
															{
																headers: {
																	Authorization:
																		user?.accessToken,
																},
															}
														);

													// console.log(data);
													router.push(
														data.data.secureUrl
													);

													setLoading(false);
												} catch (error) {
													setLoading(false);

													const _error =
														error as AxiosError;

													// console.log(_error);
												}
											}}
											className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
												plan.duration === 'ONE_MONTH'
													? 'bg-green-600 hover:bg-green-700'
													: plan.duration ===
													  'THREE_MONTHS'
													? 'bg-sky-500 hover:bg-sky-600'
													: plan.duration ===
													  'SIX_MONTHS'
													? 'bg-indigo-600 hover:bg-indigo-700'
													: 'bg-sky-600 hover:bg-sky-700'
											}`}
										>
											{loading === true ? (
												<ButtonLoader />
											) : (
												`${currentPlan?.buttonTitle}`
											)}
										</Button>
									) : (
										<Button
											type='button'
											disabled={
												loading ||
												userProductUploadSubscription !==
													null
											}
											onClick={() => {
												if (!user) {
													return router.push(
														'/signin'
													);
												}

												if (user?.role !== 'FARMER') {
													return toast.error(
														'Only sellers are allowed to this service.',
														{
															className:
																'text-xs, font-medium',
														}
													);
												}

												setCurrentPlan({
													id: plan.id,
													amount: plan.price,
													buttonTitle: `Proceed to pay for ${subscriptionPlanDurationFormatter(
														plan.duration
													)} plan`,
												});
											}}
											className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
												plan.duration === 'ONE_MONTH'
													? 'bg-green-600 hover:bg-green-700'
													: plan.duration ===
													  'THREE_MONTHS'
													? 'bg-sky-500 hover:bg-sky-600'
													: plan.duration ===
													  'SIX_MONTHS'
													? 'bg-indigo-600 hover:bg-indigo-700'
													: 'bg-sky-600 hover:bg-sky-700'
											}`}
										>
											Subscribe to{' '}
											{subscriptionPlanDurationFormatter(
												plan.duration
											)}{' '}
											plan
										</Button>
									)}
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductUploadSubscriptionModal;
