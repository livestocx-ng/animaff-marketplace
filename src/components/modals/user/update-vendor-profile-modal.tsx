'use client';
import {Info, X} from 'lucide-react';
import {
	useGlobalStore,
	useUpdateVendorProfileModalStore,
} from '@/hooks/use-global-store';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {RegionCities, RegionStates} from '@/data';
import {useEffect, useReducer, useState} from 'react';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import {ValidateVendorProfileFormData} from '@/utils/form-validations/auth.validation';

type FormData = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	// state: string;
	// city: string;
	// slug: string;
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
	// state: 'Alabama',
	// city: '',
	// slug: '',
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

const UpdateVendorProfileModal = () => {
	const {user, vendorProfile, updateUser, updateVendorProfile} =
		useGlobalStore();

	const {onClose} = useUpdateVendorProfileModalStore();

	const [loading, setLoading] = useState<boolean>(false);
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
				// state: vendorProfile?.state,
				// city: vendorProfile?.city,
				address: vendorProfile?.address,
				email: vendorProfile?.email,
				// slug: vendorProfile?.slug,
				phoneNumber: vendorProfile?.phoneNumber,
				zipPostalCode: vendorProfile?.zipPostalCode,
			},
		});
	}, [vendorProfile]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const validationError = ValidateVendorProfileFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError, {
					duration: 10000,
					className: 'text-sm',
				});
			}

			await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/update-profile`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.accessToken,
					},
				}
			);
			const cookieUpdate = await axios.patch('/api/auth/update-cookies', {
				isVendorProfileUpdated: true,
			});

			await updateUser(cookieUpdate.data);

			setLoading(false);

			updateUser(cookieUpdate.data);

			toast.success('Success');

			onClose();
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-VENDOR-PROFILE-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[40%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='font-medium'>Update Business Profile</h1>

					<Button
						type='button'
						onClick={() => {
							if (!user?.isProfileUpdated) return;

							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col space-y-2 w-full py-5'>
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

					{/* <div className='w-full'>
						<p className='text-sm font-medium flex items-center space-x-2'>
							<p>Business Domain Handle</p>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Info size={14} />
									</TooltipTrigger>
									<TooltipContent>
										<p className='text-sm'>
											This value will be used to create
											your custom domain handle. Example
											https://domain.com/sellers/slug
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<p className='text-red-500'>*</p>
						</p>
						<FormTextInput
							name='slug'
							type='number'
							disabled={loading}
							padding='py-4 px-4'
							value={formData.slug}
							handleChange={handleChange}
							placeHolder='Business Domain Handle (https://animaff.com/sellers/slug)'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div> */}

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

					{/* <div className='w-full'>
						<p className='text-sm font-medium'>
							Business State{' '}
							<span className='text-red-500'>*</span>
						</p>
						<div>
							<select
								name='state'
								className='w-full border py-4 rounded px-3 text-sm scrollbar__1'
								onChange={handleSelectChange}
							>
								<option value=''>
									{formData.state
										? formData.state
										: 'Business State'}
								</option>
								{RegionStates.map((option) => (
									<option
										key={option}
										value={option}
										className='cursor-pointer'
									>
										{option}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className='w-full'>
						<p className='text-sm font-medium'>
							Business City{' '}
							<span className='text-red-500'>*</span>
						</p>
						<div>
							<select
								name='city'
								className='w-full border py-4 rounded px-3 text-sm scrollbar__1'
								onChange={handleSelectChange}
							>
								<option value=''>
									{formData.city
										? formData.city
										: 'Business City'}
								</option>
								{RegionCities[
									formData.state ? formData.state : 'Alabama'
								]?.map((option) => (
									<option
										key={option}
										value={option}
										className='cursor-pointer'
									>
										{option}
									</option>
								))}
							</select>
						</div>
					</div> */}

				</div>

				<div className='flex justify-end'>
					{loading ? (
						<Button
							// disabled
							type='button'
							variant={'outline'}
							className='w-full bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='button'
							variant={'outline'}
							onClick={handleSubmit}
							className='w-full bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
						>
							Submit
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default UpdateVendorProfileModal;
