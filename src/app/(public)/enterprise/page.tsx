'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {premiumSubscriptionPlanDurationFormatter} from '@/utils';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';
import {
	useGlobalStore,
	useUpgradeToPremiumAccessStore,
} from '@/store/use-global-store';
import {PaystackButton} from 'react-paystack';
import ButtonLoader from '@/components/loader/button-loader';
import {Check, CheckCircle} from 'lucide-react';

const PricingPage = () => {
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
		<main>
			<section className='w-full bg-gradient-to-b from-green-800 to-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 pt-20'>
				<div className='flex flex-col space-y-4 w-full md:w-[45%]'>
					<h1 className='text-xl md:text-4xl text-white font-semibold text-center md:text-left'>
						Livestocx Enterprise
					</h1>

					<p className='text-sm text-white font-medium text-center md:text-left'>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Totam, hic minima. Eius placeat porro similique,
						corporis atque dolorum natus nostrum ad deserunt
						delectus neque fugiat praesentium officiis commodi?
						Asperiores optio, beatae pariatur voluptatibus maiores
						aliquam dolor ipsum obcaecati ut iste ex similique
						corporis. Cupiditate natus earum porro nostrum, nesciunt
						beatae accusamus exercitationem repellat unde architecto
						ipsa velit, rerum labore tempora?
					</p>

					<Button
						type='button'
						className='bg-sky-600 text-white hover:bg-sky-700 w-fit rounded-none py-8 px-4 md:px-8 mx-auto md:mx-0'
					>
						Watch Demo
					</Button>
				</div>

				<div className='h-[350px] w-full md:w-[50%] relative bg-orange-200 mt-10 md:mt-0'>
					{/* <Image
						alt=''
						fill
						src={'/pricing/mobile-ads-promotions.jpg'}
						className='object-cover rounded-sm'
					/> */}
				</div>
			</section>

			<div className='space-y-10 my-14'>
				<h1 className='text-xl font-semibold text-center'>
					Lorem, ipsum dolor.
				</h1>
				<div className='flex flex-wrap items-start justify-between w-full px-4 md:px-8'>
					<div className='h-[400px] w-full md:w-[45%] relative bg-orange-200 mb-10 md:mb-0'>
						{/* <Image
						alt=''
						fill
						src={'/pricing/mobile-ads-promotions.jpg'}
						className='object-cover rounded-sm'
					/> */}
					</div>
					<div className='w-full md:w-[50%] space-y-3'>
						<h1 className='text-base font-medium'>
							Lorem ipsum dolor sit.
						</h1>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ab autem ullam omnis obcaecati eaque nobis eos
							repellat error beatae fugit?
						</p>
						<h1 className='text-base font-medium'>
							Lorem, ipsum dolor.
						</h1>
						<p className='text-sm'>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Officia quisquam quos nam quae amet voluptas,
							quidem quas accusantium accusamus qui architecto
							explicabo omnis.
						</p>
						<h1 className='text-base font-medium'>
							Lorem ipsum dolor sit.
						</h1>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ab autem ullam omnis obcaecati eaque nobis eos
							repellat error beatae fugit?
						</p>
						<h1 className='text-base font-medium'>
							Lorem, ipsum dolor.
						</h1>
						<p className='text-sm'>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Officia quisquam quos nam quae amet voluptas,
							quidem quas accusantium accusamus qui architecto
							explicabo omnis.
						</p>
					</div>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly gap-y-10 w-full py-5 px-4 md:px-8 lg:px-0 mb-10'>
				{premiumSubscriptionPlans?.map((plan, index) => (
					<div
						key={plan.id}
						className={`flex flex-col items-center space-y-5 border rounded-md py-12 px-6 w-[350px] hover:scale-105 transition-all duration-700 ${
							plan.duration === 'THREE_MONTHS'
								? 'border-sky-200 shadow-xl shadow-sky-300'
								: 'border-slate-200 shadow-md shadow-slate-200'
						}`}
					>
						<h1 className='text-xl font-medium'>{plan.title}</h1>
						<h1 className='text-lg'>{plan.description}</h1>

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
												? 'bg-green-600 hover:bg-green-600'
												: plan.duration ===
												  'THREE_MONTHS'
												? 'bg-sky-700 hover:bg-sky-700'
												: plan.duration === 'SIX_MONTHS'
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
												buttonTitle: `Proceed to pay for ${premiumSubscriptionPlanDurationFormatter(
													plan.duration
												)} plan`,
											});
										}}
										className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
											plan.duration === 'ONE_MONTH'
												? 'bg-green-200 hover:bg-green-500'
												: plan.duration ===
												  'THREE_MONTHS'
												? 'bg-sky-500 hover:bg-sky-600'
												: plan.duration === 'SIX_MONTHS'
												? 'bg-indigo-200 hover:bg-indigo-500'
												: 'bg-red-600 hover:bg-red-700'
										}`}
									>
										Subscribe to{' '}
										{premiumSubscriptionPlanDurationFormatter(
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

export default PricingPage;
