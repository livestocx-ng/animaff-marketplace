'use client';
import {
	useGlobalStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {useEffect, useReducer, useState} from 'react';
import {CircleDollarSign, Info, X} from 'lucide-react';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import {ValidatePremiumSubscriptionCheckoutFormData} from '@/utils/form-validations/auth.validation';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {Badge} from '@/components/ui/badge';
import {useRouter} from 'next/navigation';

type FormData = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	slug: string;
	zipPostalCode: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	name: '',
	email: '',
	phoneNumber: '',
	address: '',
	slug: '',
	zipPostalCode: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const PremiumSubscriptionCheckoutModal = () => {
	const {
		user,
		vendorProfile,
		updateVendorProfile,
		premiumSubscriptionPlanId,
	} = useGlobalStore();

	const router = useRouter();

	const {onClose} = usePremiumSubscriptionCheckoutModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [vendorSlugExists, setVendorSlugExists] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const fetchVendorProfile = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updateVendorProfile(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-VENDOR-PROFILE-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchVendorProfile();
	}, []);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				name: vendorProfile?.name,
				address: vendorProfile?.address,
				email: vendorProfile?.email,
				slug: vendorProfile?.slug,
				phoneNumber: vendorProfile?.phoneNumber,
				zipPostalCode: vendorProfile?.zipPostalCode,
			},
		});

		setVendorSlugExists(vendorProfile?.slug.length !== 0 ? true : false);
	}, [vendorProfile]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const validationError =
				ValidatePremiumSubscriptionCheckoutFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError, {
					duration: 10000,
					className: 'text-sm',
				});
			}

			const sellerSlugAvailability = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/seller-slug-availability?slug=${formData.slug}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			if (sellerSlugAvailability.data.data === true) {
				setLoading(false);

				return toast.error('Business domain handle already exists!', {
					duration: 10000,
					className: 'text-sm',
				});
			}

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/payments/initialize-premium-subscription-payment?plan=${premiumSubscriptionPlanId}`,
				{},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			localStorage.setItem(
				'animaff_premium_subscription_data',
				JSON.stringify(formData)
			);

			router.push(data.data.secureUrl);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-VENDOR-PROFILE-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[50%] bg-white pt-2 pb-5 px-4 max-h-[650px] overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='font-medium text-sky-600'>Checkout</h1>

					<Button
						type='button'
						onClick={() => {
							if (loading) return;

							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col space-y-2 w-full py-3'>
					<div className='w-full'>
						<p className='text-sm font-medium'>
							Business Name{' '}
							<span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							name='name'
							disabled={loading}
							padding='py-4 px-4'
							placeHolder='Business Name'
							value={formData.name}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium flex items-center space-x-2'>
							<p>Business Domain Handle</p>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Info size={14} />
									</TooltipTrigger>
									<TooltipContent className='w-[350px]'>
										<p className='text-sm font-normal'>
											This value will be used to create
											your custom domain handle. &nbsp;
											<span className='font-medium'>
												https://domain.com/store/handle
											</span>
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<p className='text-red-500'>*</p>
						</p>
						<FormTextInput
							name='slug'
							disabled={loading || vendorSlugExists}
							padding='py-4 px-4'
							value={formData.slug}
							handleChange={handleChange}
							placeHolder='Domain Handle'
							classes='w-full text-sm placeholder:text-xs border focus:border-slate-500 rounded'
						/>

						<Badge
							variant={'secondary'}
							className='text-sky-500 text-xs'
						>
							https://domain.com/store/{formData.slug}
						</Badge>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Business Email{' '}
							<span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							name='email'
							disabled={loading}
							padding='py-4 px-4'
							placeHolder='Business Email'
							value={formData.email}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Phone Number <span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							type='text'
							name='phoneNumber'
							padding='py-3 px-4'
							disabled={loading}
							placeHolder='Phone Number'
							value={formData.phoneNumber}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Business Address{' '}
							<span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							type='text'
							name='address'
							padding='py-3 px-4'
							disabled={loading}
							placeHolder='Business Address'
							value={formData.address}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Zip Code <span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							type='text'
							name='zipPostalCode'
							padding='py-3 px-4'
							disabled={loading}
							handleChange={handleChange}
							placeHolder='Zip/Postal Code'
							value={formData.zipPostalCode}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
				</div>

				<div className='flex justify-end'>
					{loading ? (
						<Button
							// disabled
							type='button'
							variant={'outline'}
							className='w-full bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='button'
							variant={'outline'}
							onClick={handleSubmit}
							className='w-full bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0 flex items-center space-x-2'
						>
							<p>Proceed to Checkout</p>{' '}
							<CircleDollarSign size={15} />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default PremiumSubscriptionCheckoutModal;
