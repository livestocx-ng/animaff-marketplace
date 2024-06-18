'use client';
import Image from 'next/image';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {Info} from 'lucide-react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {RegionCities, RegionStates} from '@/data';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import {useEffect, useReducer, useRef, useState} from 'react';
import FormTextInput from '@/components/input/form-text-input';
import {ValidateUpdateProfileFormData} from '@/utils/form-validations/settings.validation';
import {ValidateUpdateVendorProfileFormData} from '@/utils/form-validations/vendor.profile.validation';

type FormData = {
	name: string;
	state: string;
	city: string;
	address: string;
	avatar: File | null;
	avatarUrl: string;
	email: string;
	phoneNumber: string;
	zipPostalCode: string;
	isUpdated: boolean;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	name: '',
	state: '',
	city: '',
	address: '',
	avatar: null,
	avatarUrl: '',
	email: '',
	phoneNumber: '',
	zipPostalCode: '',
	isUpdated: false,
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

// const VendorSettings = ({user}: AccountSettingsProps) => {
const VendorSettings = () => {
	const {user, vendorProfile, updateVendorProfile} = useGlobalStore();

	const avatarRef = useRef<HTMLInputElement>(null);

	const [cities, setCities] = useState<string[]>([]);
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

			// console.log('[DATA] ::  ', data);

			updateVendorProfile(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[FETCH-VENDOR-PROFILE-ERROR] :: ', _error);
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
				state: vendorProfile?.state,
				city: vendorProfile?.city,
				address: vendorProfile?.address,
				avatarUrl: vendorProfile?.avatar,
				email: vendorProfile?.email,
				phoneNumber: vendorProfile?.phoneNumber,
				zipPostalCode: vendorProfile?.zipPostalCode,
				isUpdated: vendorProfile?.isUpdated,
			},
		});

		setCities(RegionCities[vendorProfile?.state!]);
	}, [vendorProfile]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.log('[EVENT] :: ', event.target.name);

		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				avatar: event.target.files![0],
				avatarUrl: URL.createObjectURL(event.target.files![0]),
			},
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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError =
				ValidateUpdateVendorProfileFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError);
			}

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/update-profile`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			updateVendorProfile(data.data);

			toast.success('Vendor profile updated', {className: 'text-sm'});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-VENDOR-PROFILE-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='w-full py-3 flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Vendor Settings</h1>

			<div className='flex flex-col-reverse md:flex-row items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-full md:w-[55%] flex flex-col space-y-3'
				>
					<div className='space-y-1 w-full'>
						<p className='text-sm'>Name</p>
						<FormTextInput
							name='name'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.name}
							handleChange={handleChange}
							placeHolder='Name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='space-y-1 w-full'>
						<p className='text-sm'>State</p>
						<select
							name='state'
							className='w-full border py-3 rounded px-3 text-sm scrollbar__1'
							onChange={handleSelectChange}
						>
							<option value={formData.state}>
								{formData.state}
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
					<div className='space-y-1 w-full'>
						<p className='text-sm'>City</p>
						<select
							name='city'
							className='w-full border py-3 rounded px-3 text-sm scrollbar__1'
							onChange={handleSelectChange}
						>
							<option value={formData.city}>
								{formData.city}
							</option>
							{cities?.map((option) => (
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
					<div className='space-y-1 w-full'>
						<p className='text-sm'>Zip/Postal Code</p>
						<FormTextInput
							name='zipPostalCode'
							type='number'
							padding='py-3 px-4'
							disabled={loading}
							handleChange={handleChange}
							placeHolder='Zip/Postal Code'
							value={formData.zipPostalCode}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1 w-full'>
						<p className='text-sm'>Address</p>
						<FormTextInput
							name='address'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.address}
							handleChange={handleChange}
							placeHolder='Address'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1 w-full'>
						<p className='text-sm'>Email</p>
						<FormTextInput
							name='email'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1 w-full'>
						<p className='text-sm'>Phone Number</p>
						<FormTextInput
							name='phoneNumber'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.phoneNumber}
							handleChange={handleChange}
							placeHolder='Phone Number'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					{loading ? (
						<Button
							disabled
							type='button'
							className='bg-green-500 text-white text-sm hover:bg-green-600 hover:text-white w-full md:w-fit px-3 rounded'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							className='bg-green-500 text-white text-sm hover:bg-green-600 hover:text-white w-full md:w-fit px-3 rounded'
						>
							Save Changes
						</Button>
					)}
				</form>

				<div
					// onSubmit={handleAvatarSubmit}
					className='flex flex-col items-center justify-center space-y-3 w-full md:w-[45%]'
				>
					<div className='h-[150px] w-[150px] rounded-full border relative'>
						<Image
							alt='image'
							// width={150}
							// height={150}
							fill
							unoptimized={true}
							// src={'/user__1.svg'}
							className='object-cover rounded-full h-full w-full'
							src={
								formData.avatarUrl
									? formData.avatarUrl
									: '/vendorProfile.jpg'
							}
						/>
					</div>

					<input
						type='file'
						name='avatar'
						ref={avatarRef}
						accept='.jpeg, .jpg'
						style={{display: 'none'}}
						onChange={handleMediaUpload}
					/>

					<Button
						type='button'
						onClick={() => avatarRef.current?.click()}
						className='border border-green-500 text-[10px] bg-white hover:bg-white text-green-500 hover:border-green-600 hover:text-green-600 w-[100px] px-3 rounded'
					>
						Choose Image
					</Button>
				</div>
			</div>
		</div>
	);
};

export default VendorSettings;
