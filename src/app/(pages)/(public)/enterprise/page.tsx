'use client';
import axios from 'axios';
import Image from 'next/image';
import {
	useGlobalStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import {Button} from '@/components/ui/button';
import {enterprisePlanComparisons} from '@/data';
import Footer from '@/components/navigation/footer';
import {DataTable} from '@/components/ui/data-table';
import {PriceFormatter} from '@/utils/price.formatter';
import {subscriptionPlanDurationFormatter} from '@/utils';
import {useRouter, useSearchParams} from 'next/navigation';
import {Fragment, Suspense, useEffect, useRef, useState} from 'react';
import MainNavbar from '@/components/navigation/main-nav-bar';
import {EnterprisePlansComparisonsColumns} from './components/pricing-columns';

const EnterprisePage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const subscriptionPlansRef = useRef<HTMLDivElement>(null);

	const {
		user,
		userPremiumSubscription,
		premiumSubscriptionPlans,
		updatePremiumSubscriptionPlanId,
	} = useGlobalStore();

	const premiumSubscriptionCheckoutModal =
		usePremiumSubscriptionCheckoutModalStore();

	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});

	useEffect(() => {
		if (
			searchParams.get('subscription_now')! === 'true' &&
			subscriptionPlansRef !== null
		) {
			subscriptionPlansRef.current!.scrollIntoView({
				behavior: 'smooth',
			});
			subscriptionPlansRef.current!.scrollTo({
				behavior: 'smooth',
				top: -20,
			});
		}
	}, [searchParams, subscriptionPlansRef]);

	const handlePremiumSubscriptionInquiry = async () => {
		axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-inquiry`,
			{},
			{
				headers: {
					Authorization: user?.accessToken,
				},
			}
		);
	};

	return (
		<Suspense fallback={<div></div>}>
			<Fragment>
				<MainNavbar />

				<main className='relative'>
					<section className='w-full bg-gradient-to-b from-green-800 to-white flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 pt-20'>
						<div className='flex flex-col space-y-4 w-full md:w-[45%]'>
							<h1 className='text-xl md:text-5xl text-white font-semibold text-center md:text-left'>
								Animaff for Enterprises
							</h1>

							<p className='text-sm md:text-lg text-white font-medium text-center md:text-left leading-8'>
								Expand your business reach. Sell to thousands on
								our Marketplace and showcase your products with
								our custom website and catalog built for you.
							</p>

							<Button
								type='button'
								onClick={() => {
									if (subscriptionPlansRef.current) {
										subscriptionPlansRef.current.scrollIntoView(
											{
												behavior: 'smooth',
											}
										);
									}

									if (user) {
										handlePremiumSubscriptionInquiry();
									}
								}}
								className='bg-sky-600 text-white hover:bg-sky-700 w-fit rounded-md py-8 px-4 md:px-8 mx-auto md:mx-0'
							>
								Get Started
							</Button>
						</div>

						<div className='h-[250px] w-full md:w-[50%] md:h-[400px] relative bg-orange-20 mt-5 md:mt-0'>
							<Image
								alt=''
								fill
								className='object-fill md:object-cover rounded-sm'
								src={'/enterprise/image__header__1.png'}
							/>
						</div>
					</section>

					{/* <div className='space-y-10 my-14'>
					<h1 className='text-lg md:text-5xl font-semibold text-center'>
						What you get
					</h1>
					<div className='flex flex-wrap items-start justify-between w-full px-4 md:px-8'>
						<div className='h-[400px] w-full md:w-[45%] relative bg-orange-200 mb-10 md:mb-0'>
							<Image
								alt=''
								fill
								className='object-cover rounded-sm'
								src={'/enterprise/image__header__3.jpg'}
							/>
						</div>
						<div className='w-full md:w-[50%] space-y-3'>
							<p className='text-sm md:text-xl leading-8'>
								Our enterprise platform features a custom online
								store, marketplace listings, sales management
								and analytics, weekly product promotions,
								business logo creation, and branded resources
								including social media flyers.
							</p>
						</div>
					</div>
				</div> */}

					<div
						ref={subscriptionPlansRef}
						className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly gap-y-10 w-full py-20 px-4 md:px-8 lg:px-0'
					>
						{premiumSubscriptionPlans?.map((plan, index) => (
							<div
								key={plan.id}
								className={`flex flex-col items-center space-y-5 border rounded-md py-12 px-6 w-full md:w-[30%] hover:scale-105 transition-all duration-700 border-slate-300 shadow-xl shadow-slate-300
							${plan.duration === 'SIX_MONTHS' && 'md:scale-110 hover:scale-110'}`}
							>
								<h1 className='text-2xl font-medium'>
									{plan.title}
								</h1>
								{/* <h1 className='text-sm'>{plan.description}</h1> */}
								<h1 className='text-lg font-semibold'>
									{PriceFormatter(plan.price)} /{' '}
									{subscriptionPlanDurationFormatter(
										plan.duration
									)}
								</h1>
								{currentPlan.id !== 0 &&
								plan.id === currentPlan.id ? (
									<Button
										type='button'
										onClick={async () => {
											if (!user) {
												return router.push('/signin');
											}

											premiumSubscriptionCheckoutModal.onOpen();
											updatePremiumSubscriptionPlanId(
												currentPlan?.id
											);
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
										{currentPlan?.buttonTitle}
									</Button>
								) : (
									<Button
										type='button'
										disabled={
											userPremiumSubscription !== null
										}
										onClick={() => {
											if (!user) {
												return router.push(
													'/signin?redirect_to=enterprise'
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
												buttonTitle: `Proceed to checkout`,
											});

											handlePremiumSubscriptionInquiry();
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
							</div>
						))}
					</div>

					<div className='w-full px-4 md:px-[160px] mb-20 flex flex-col space-y-5'>
						<h1 className='font-medium text-lg md:text-4xl text-center'>
							Comparing Animaff to owning a regular website/store
						</h1>
						<DataTable
							hasPagination={false}
							borderRadius='rounded-b'
							data={enterprisePlanComparisons}
							columns={EnterprisePlansComparisonsColumns}
						/>
					</div>

					<div className='w-full py-5 px-4 md:px-[160px] my-10 flex flex-col space-y-5'>
						<h1 className='font-medium text-lg md:text-4xl text-center'>
							Animaff Plugin
						</h1>

						<p className='leading-8'>
							You can now seamlessly integrate your Animaff
							catalog or products into your existing website,
							similar to how Calendly and Typeform work. This
							powerful feature allows you to display your products
							directly on your site, enhancing your online
							presence and engaging customers without requiring
							them to leave your platform. Email us for more
							information at support@animaff.com
						</p>
					</div>
				</main>
				<Footer />
			</Fragment>
		</Suspense>
	);
};

export default EnterprisePage;
