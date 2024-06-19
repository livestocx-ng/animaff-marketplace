'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {
	useGlobalStore,
	useUpgradeToPremiumAccessStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {CheckCircle} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {PaystackButton} from 'react-paystack';
import ButtonLoader from '@/components/loader/button-loader';
import {subscriptionPlanDurationFormatter} from '@/utils';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';
import {PriceFormatter} from '@/utils/price.formatter';

const EnterprisePage = () => {
	const router = useRouter();
	const queryParams = useSearchParams();
	const transactionRef = queryParams.get('transactionRef');
	const transactionStatus = queryParams.get('transactionStatus');

	const {
		user,
		userPremiumSubscription,
		premiumSubscriptionPlans,
		updateUserPremiumSubscription,
	} = useGlobalStore();

	const {onClose} = useUpgradeToPremiumAccessStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});
	const [isVerifyTransactionPending, setIsVerifyTransactionPending] =
		useState<boolean>(false);

	useEffect(() => {
		if (transactionStatus === 'success' && transactionRef !== '') {
			handleCreatePremiumSubscription(transactionRef!);
		}
	}, [user, transactionRef, transactionStatus]);

	const handleCreatePremiumSubscription = async (reference: string) => {
		try {
			if (!user) return;

			if (isVerifyTransactionPending === true) return;

			setIsVerifyTransactionPending(true);

			const verifyTransactionResponse = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/payments/verify-premium-subscription-payment?reference=${reference}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log(verifyTransactionResponse);

			if (verifyTransactionResponse.data.data.paymentSession === true) {
				const {data} = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/create-premium-subscription?plan=${verifyTransactionResponse.data.data.plan}`,
					{
						payment_gateway: 'STRIPE',
						payment_date: new Date(),
						payment_reference: reference,
						payment_method: 'WEB',
					},
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				);

				setIsVerifyTransactionPending(false);

				updateUserPremiumSubscription(data.data);

				onClose();

				toast.success(`Premium subscription successful!`, {
					duration: 3500,
				});

				return router.push('/enterprise');
			} else {
				setIsVerifyTransactionPending(false);

				return toast.success(`Payment unverified!`, {duration: 3500});
			}
		} catch (error) {
			setIsVerifyTransactionPending(false);

			const _error = error as AxiosError;

			// console.log('[PROMOTION-PAYMENT-ERROR]', _error);

			toast.error('An error occurred.');
		}
	};

	return (
		<main>
			<section className='w-full bg-gradient-to-b from-green-800 to-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 pt-20'>
				<div className='flex flex-col space-y-4 w-full md:w-[45%]'>
					<h1 className='text-xl md:text-4xl text-white font-semibold text-center md:text-left'>
						Animaff for Enterprises
					</h1>

					<p className='text-sm text-white font-medium text-center md:text-left'>
						Expand your business reach. Sell to thousands on our
						Marketplace and showcase your products with our custom
						website and catalog built for you.
					</p>

					<Button
						type='button'
						className='bg-sky-600 text-white hover:bg-sky-700 w-fit rounded-none py-8 px-4 md:px-8 mx-auto md:mx-0'
					>
						Watch Demo
					</Button>
				</div>

				<div className='h-[400px] w-full md:w-[50%] relative bg-orange-20 mt-10 md:mt-0'>
					<Image
						alt=''
						fill
						className='object-cover rounded-sm'
						src={'/enterprise/image__header__2.jpg'}
					/>
				</div>
			</section>

			<div className='space-y-10 my-14'>
				<h1 className='text-xl font-semibold text-center'>
					What you get
				</h1>
				<div className='flex flex-wrap items-center justify-between w-full px-4 md:px-8'>
					<div className='h-[400px] w-full md:w-[45%] relative bg-orange-200 mb-10 md:mb-0'>
						<Image
							alt=''
							fill
							className='object-cover rounded-sm'
							src={'/enterprise/image__header__3.jpg'}
						/>
					</div>
					<div className='w-full md:w-[50%] space-y-3'>
						<p className='text-sm md:text-lg'>
							Our enterprise platform features a custom online
							store, marketplace listings, sales management and
							analytics, weekly product promotions, business logo
							creation, and branded resources including social
							media flyers.
						</p>
					</div>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly gap-y-10 w-full py-5 px-4 md:px-8 lg:px-0 mb-20'>
				{premiumSubscriptionPlans?.map((plan, index) => (
					<div
						key={plan.id}
						className={`flex flex-col items-center space-y-5 border rounded-md py-12 px-6 w-full md:w-[400px] hover:scale-105 transition-all duration-700 border-slate-300 shadow-xl shadow-slate-300
							${plan.duration === 'SIX_MONTHS' && 'md:scale-110 hover:scale-110'}`}
					>
						<h1 className='text-2xl font-medium'>{plan.title}</h1>
						<h1 className='text-sm'>{plan.description}</h1>
						<h1 className='text-lg font-semibold'>
							{PriceFormatter(plan.price)} /{' '}
							{subscriptionPlanDurationFormatter(plan.duration)}
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
												return router.push('/signin');
											}

											try {
												setLoading(true);

												const {data} = await axios.post(
													`${process.env.NEXT_PUBLIC_API_URL}/payments/initialize-premium-subscription-payment?plan=${currentPlan.id}`,
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
												: plan.duration === 'SIX_MONTHS'
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
											userPremiumSubscription !== null
										}
										onClick={() => {
											if (!user) {
												return router.push('/signin');
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
												: plan.duration === 'SIX_MONTHS'
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

						<div className='text-sm space-y-3'>
							{plan.info.map((item) => (
								<div
									key={item.id}
									className='flex items-center space-x-3'
								>
									<CheckCircle
										size={16}
										className='text-main'
									/>
									<p>{item.title}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default EnterprisePage;
