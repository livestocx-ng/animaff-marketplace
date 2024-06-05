'use client';

import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useReducer, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useRouter, useSearchParams} from 'next/navigation';
import AuthHeader from '../../../../components/header/auth-header';
import FormPasswordInput from '@/components/input/form-password-input';
import ButtonLoader from '@/components/loader/button-loader';

type FormData = {
	newPassword: string;
	confirmPassword: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	newPassword: '',
	confirmPassword: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const SignInPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const email = searchParams.get('email');
	const token = searchParams.get('token');

	const [loading, setLoading] = useState(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formData.newPassword !== formData.confirmPassword) {
			return toast.error('Passwords do not match');
		}

		try {
			setLoading(true);

			await axios.patch(
				`/api/auth/reset-password?email=${email}&token=${token}`,
				formData
			);

			setLoading(false);

			toast.success('Password reset successful', {duration: 4000});

			router.push(`/signin`);
		} catch (_error) {
			setLoading(false);

			const error = _error as AxiosError;

			// console.log('[ERROR]', error);

			toast.error('Invalid OTP');
		}
	};

	return (
		<div className='w-full'>
			<section className='h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Reset Password
				</h1>
			</section>

			<div className='flex flex-col justify-center items-center  py-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
				>
					<h1 className='text-center text-2xl font-semibold'>
						Reset Password
					</h1>
					<div className='space-y-4'>
						<FormPasswordInput
							name='newPassword'
							padding='py-4 px-4'
							value={formData.newPassword}
							handleChange={handleChange}
							placeHolder='New Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>
						<FormPasswordInput
							padding='py-4 px-4'
							name='confirmPassword'
							handleChange={handleChange}
							placeHolder='Confirm New Password'
							value={formData.confirmPassword}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>

						{loading ? (
							<Button
								type='button'
								className='bg-green-700 text-white h-12 hover:bg-green-700 w-full rounded-full py-4 cursor-default'
							>
								<ButtonLoader />
							</Button>
						) : (
							<Button
								type='submit'
								className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-4'
							>
								Create New Password
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInPage;
