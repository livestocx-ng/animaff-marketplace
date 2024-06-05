'use client';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {useReducer, useState} from 'react';
import {Button} from '@/components/ui/button';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import AuthHeader from '../../../../components/header/auth-header';

type FormData = {
	email: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	email: '',
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

		try {
			setLoading(true);
			// console.log('[SIGNIN-PAYLOAD] :: ', formData);

			await axios.post('/api/auth/forgot-password', formData);

			setLoading(false);

			toast.success('Success, check your email for an OTP token', {
				duration: 4000,
			});

			router.push(`/forgot-password/otp?email=${formData.email}`);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FORGOT-PASSWORD-ERROR] :: ', _error);

			toast.error('An error occured');
		}
	};

	return (
		<div className='w-full'>
			<section className='h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Forgot Password
				</h1>
			</section>

			<div className='flex flex-col justify-center items-center  py-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
				>
					<div className='space-y-3'>
						<h1 className='text-center text-2xl font-semibold'>
							Forgot Password
						</h1>
						<p className='text-center text-sm'>
							Please enter your email address. You will receive a
							code to create a new password via email.
						</p>
					</div>

					<div className='space-y-4'>
						<FormTextInput
							name='email'
							padding='py-4 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email address'
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
								Submit
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInPage;
