'use client';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useEffect, useReducer, useState} from 'react';

import {User} from '@/types/types';
import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';
import SelectDropdown from '@/components/ui/select-dropdown';
import {NigerianCities, NigerianStates} from '@/data';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import {ValidateUpdateBillingFormData} from '@/utils/form-validations/billing.validation';

interface BillingSettingsProps {
	user: User | null;
}

type FormData = {
	firstName: string;
	lastName: string;
	company: string;
	address: string;
	state: string;
	city: string;
	email: string;
	phoneNumber: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	firstName: '',
	lastName: '',
	company: '',
	address: '',
	state: 'Abia',
	city: '',
	email: '',
	phoneNumber: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const BillingSettings = () => {
	const {user, billing, updateBilling} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const fetchBilling = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/billing`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data);

			updateBilling(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-BILLING-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchBilling();
	}, []);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				firstName: billing?.firstName,
				lastName: billing?.lastName,
				company: billing?.company,
				address: billing?.address,
				state: billing?.state,
				city: billing?.city,
				email: billing?.email,
				phoneNumber: billing?.phoneNumber,
			},
		});
	}, [billing]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError = ValidateUpdateBillingFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError);
			}

			// console.log('[UPDATE-BILLING-PAYLOAD] :: ', formData);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/user/update-billing`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			// console.log('[BILLING] :: ', data);

			await updateBilling(data.data);

			toast.success('Billing settings updated');
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-BILLING-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='w-full py-3  flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Billing Settings</h1>

			<div className='flex items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-full flex flex-col space-y-3'
				>
					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[30%]'>
							<p className='text-sm'>First Name</p>
							<FormTextInput
								name='firstName'
								padding='py-3 px-4'
								value={formData.firstName}
								handleChange={handleChange}
								placeHolder='First name'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='space-y-1 w-[30%]'>
							<p className='text-sm'>Last Name</p>
							<FormTextInput
								name='lastName'
								padding='py-3 px-4'
								value={formData.lastName}
								handleChange={handleChange}
								placeHolder='Last name'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='space-y-1 w-[30%]'>
							<p className='text-sm'>Company Name (Optional)</p>
							<FormTextInput
								name='company'
								padding='py-3 px-4'
								value={formData.company}
								handleChange={handleChange}
								placeHolder='Company'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					<div className='space-y-1'>
						<p className='text-sm'>Street Address</p>
						<FormTextInput
							name='address'
							padding='py-3 px-4'
							handleChange={handleChange}
							value={formData.address}
							placeHolder='New Rayfield, Road 33, Abuja Street'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>State</p>
							<div>
								<select
									name='state'
									className='w-full border py-3 rounded px-3 text-xs scrollbar__1'
									onChange={(event) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												state: event.target.value,
											},
										});
									}}
								>
									{NigerianStates.map((option) => (
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
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>City</p>
							<div>
								<select
									name='city'
									className='w-full border py-3 rounded px-3 text-xs scrollbar__1'
									onChange={(event) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {city: event.target.value},
										});
									}}
								>
									{NigerianCities[formData.state]?.map(
										(option) => (
											<option
												key={option}
												value={option}
												className='cursor-pointer'
											>
												{option}
											</option>
										)
									)}
								</select>
							</div>
						</div>
					</div>

					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>Email</p>
							<FormTextInput
								name='email'
								padding='py-3 px-4'
								value={formData.email}
								handleChange={handleChange}
								placeHolder='Email'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>Phone Number</p>
							<FormTextInput
								name='phoneNumber'
								padding='py-3 px-4'
								value={formData.phoneNumber}
								handleChange={handleChange}
								placeHolder='Phone number'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					{loading ? (
						<Button
							type='button'
							disabled
							className='bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white w-fit px-3 rounded'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							className='bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white w-fit px-3 rounded'
						>
							Save Changes
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default BillingSettings;
