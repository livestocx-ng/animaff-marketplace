'use client';
import axios, {AxiosError} from 'axios';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import {useEffect, useReducer, useRef, useState} from 'react';

import {User} from '@/types/types';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';
import {ValidateUpdateProfileFormData} from '@/utils/form-validations/settings.validation';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';

interface AccountSettingsProps {
	user: User | null;
}

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	avatar: File | null;
	avatarUrl: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	avatar: null,
	avatarUrl: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

// const AccountSettings = ({user}: AccountSettingsProps) => {
const AccountSettings = () => {
	const {user, updateUser} = useUserHook();

	const avatarRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email,
				phoneNumber: user?.phoneNumber,
				avatarUrl: user?.avatar,
			},
		});
	}, [user]);

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError = ValidateUpdateProfileFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError, {duration: 10000});
			}

			// console.log('[UPDATE-PROFILE-PAYLOAD] :: ', formData);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/update-profile`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.accessToken,
					},
				}
			);

			const cookieUpdate = await axios.patch(
				'/api/auth/update-cookies',
				data.data
			);

			await updateUser(cookieUpdate.data);

			setLoading(false);

			// // console.log('[PROFILE] :: ', cookieUpdate.data);

			toast.success('Profile updated');
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[UPDATE-PROFILE-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='w-full py-3 flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Account Settings</h1>

			<div className='flex flex-col-reverse md:flex-row items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-full md:w-[55%] flex flex-col space-y-3 mt-5 md:mt-0'
				>
					<div className='space-y-1 w-full'>
						<p className='text-sm'>First Name</p>
						<FormTextInput
							name='firstName'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.firstName}
							handleChange={handleChange}
							placeHolder='First name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1 w-full'>
						<p className='text-sm'>Last Name</p>
						<FormTextInput
							name='lastName'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.lastName}
							handleChange={handleChange}
							placeHolder='Last name'
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
							className='bg-green-500 text-white text-xs hover:bg-green-600 hover:text-white w-full md:w-fit px-3 rounded'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							className='bg-green-500 text-white text-xs hover:bg-green-600 hover:text-white w-full md:w-fit px-3 rounded'
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
									: user?.avatar!
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

export default AccountSettings;
