'use client';
import {useState} from 'react';
import {X} from 'lucide-react';
import {
	useGlobalStore,
	useUpgradeToPremiumAccessStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {PaystackButton} from 'react-paystack';
import ButtonLoader from '@/components/loader/button-loader';
import {subscriptionPlanDurationFormatter} from '@/utils';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';

const UpgradeToPremiumModal = () => {
	const router = useRouter();

	const {user, premiumSubscriptionPlans, updateUserPremiumSubscription} =
		useGlobalStore();

	const {onClose} = useUpgradeToPremiumAccessStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});

	const handleSuccess = async (response: any) => {
		try {
			setLoading(true);
			// console.log(response);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/create-premium-subscription?plan=${currentPlan.id}`,
				{
					payment_gateway: 'PAYSTACK',
					payment_date: new Date(),
					payment_reference: response.reference,
					payment_method: 'WEB',
				},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			updateUserPremiumSubscription(data.data);

			onClose();

			toast.success(`Success!`, {duration: 3500});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[PROMOTION-PAYMENT-ERROR]', _error);

			toast.error('An error occurred.');
		}
	};

	const handleClose = () => {
		toast.error('Payment cancelled!');
	};

	const payStackButtonProps = {
		reference: generateRandomPaymentReference(),
		email: user?.email!,
		metadata: {
			custom_fields: [
				{
					display_name: 'payment_type',
					variable_name: 'payment_type',
					value: 'PREMIUM_SUBSCRIPTION',
				},
				{
					display_name: 'premium_subscription_plan',
					variable_name: 'premium_subscription_plan',
					value: currentPlan.id,
				},
			],
		},
		amount: currentPlan.amount * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		text: currentPlan.buttonTitle,
		onSuccess: (response: any) => handleSuccess(response),
		onClose: handleClose,
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[90%] bg-gradient-to-b from-white to-green-200 pb-4 overflow-y-auto scrollbar__1 rounded-lg'>
				<div className='flex items-center justify-between py-4 border-b border-b-slate-400 w-full px-6'>
					<h1 className='font-medium'>Upgrade your plan</h1>

					<Button
						type='button'
						onClick={() => {
							if (loading) return;

							onClose();
						}}
						className='bg-[#0000000] hover:bg-[#0000000]'
					>
						<X className='text-slate-800 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly gap-y-10 w-full py-5 px-12 lg:px-0'>
					{premiumSubscriptionPlans?.map((plan, index) => (
						<div
							key={plan.id}
							className={`flex flex-col items-center space-y-5 lg:w-[50%] ${
								index !== 3 && 'border-'
							}`}
						>
							<h1 className='text-lg font-medium'>
								{plan.title}
							</h1>

							{loading && currentPlan.id === plan.id ? (
								<Button
									type='button'
									disabled={true}
									className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
										plan.duration === 'ONE_MONTH'
											? 'bg-sky-400 hover:bg-sky-500'
											: plan.duration === 'THREE_MONTHS'
											? 'bg-teal-500 hover:bg-teal-600'
											: plan.duration === 'SIX_MONTHS'
											? 'bg-indigo-400 hover:bg-indigo-500'
											: 'bg-red-600 hover:bg-red-700'
									}`}
								>
									<ButtonLoader />
								</Button>
							) : (
								<>
									{currentPlan.id !== 0 &&
									plan.id === currentPlan.id ? (
										<PaystackButton
											{...payStackButtonProps}
											className={`text-white h-10 w-fit rounded-full px-4 py-3 text-xs ${
												plan.duration === 'ONE_MONTH'
													? 'bg-sky-600 hover:bg-sky-600'
													: plan.duration ===
													  'THREE_MONTHS'
													? 'bg-teal-700 hover:bg-teal-700'
													: plan.duration ===
													  'SIX_MONTHS'
													? 'bg-indigo-600 hover:bg-indigo-600'
													: 'bg-red-700 hover:bg-red-700'
											}`}
										/>
									) : (
										<Button
											type='button'
											disabled={loading}
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
													? 'bg-sky-400 hover:bg-sky-500'
													: plan.duration ===
													  'THREE_MONTHS'
													? 'bg-teal-500 hover:bg-teal-600'
													: plan.duration ===
													  'SIX_MONTHS'
													? 'bg-indigo-400 hover:bg-indigo-500'
													: 'bg-red-600 hover:bg-red-700'
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

							<ol className='list-disc text-xs md:text-sm space-y-3'>
								{plan.info.map((item) => (
									<li key={item.id} className=''>
										{item.title}
									</li>
								))}
							</ol>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UpgradeToPremiumModal;
