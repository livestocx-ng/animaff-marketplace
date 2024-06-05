'use client';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import {useEffect, useRef, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import ButtonLoader from '@/components/loader/button-loader';
import AuthHeader from '../../../../../components/header/auth-header';

const numberOfInputs = 4;

const SignInPage = () => {
	const router = useRouter();
	const {user} = useUserHook();
	const searchParams = useSearchParams();

	const email = searchParams.get('email');

	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState(Array(numberOfInputs).fill(''));
	const inputRefs = useRef(Array(numberOfInputs).fill(null));

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		if (isNaN(parseInt(e.target.value, 10))) return;

		const value = e.target.value;
		const newOtp = [...otp];
		newOtp[index] = value;

		setOtp(newOtp);

		if (value && index < numberOfInputs - 1) {
			inputRefs.current[index + 1]?.focus();

			// console.log('[FOCUS]');
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace' || e.key === 'Delete') {
			e.preventDefault();
			const newOtp = [...otp];
			newOtp[index] = ''; // Clear the input field on Backspace or Delete
			setOtp(newOtp);

			if (index > 0) {
				inputRefs.current[index - 1]?.focus(); // Move focus to the previous input field
			}
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);
			// console.log('[OTP-PAYLOAD] :: ', otp);
			const token = String(otp).split(',').join('');
			// console.log('[TOKEN] :: ', token);

			await axios.get(`/api/auth/verify-otp?token=${token}`);

			setLoading(false);

			toast.success('Success');

			router.push(`/reset-password?email=${email}&token=${token}`);
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
					Verify OTP
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
							Enter OTP
						</h1>
					</div>

					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							{otp.map((digit, index) => (
								<input
									key={index}
									name='number'
									value={digit}
									onChange={(e) => {
										handleInputChange(e, index);
									}}
									onKeyDown={(e) => {
										handleKeyDown(e, index);
									}}
									ref={(ref) => {
										(inputRefs.current[index] = ref)
									}}
									className='h-10 py-8 md:py-10 px-4 w-[60px] md:w-[100px] text-center text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
								/>
							))}
						</div>

						<div className='flex justify-end'>
							<p className='text-sm cursor-pointer'>
								Resend Code?
							</p>
						</div>

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
