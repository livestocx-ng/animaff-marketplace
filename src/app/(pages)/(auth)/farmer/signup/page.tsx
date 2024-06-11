'use client';
import Link from 'next/link';
import Image from 'next/image';
import {RegionStates} from '@/data';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {useReducer, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import AuthHeader from '../../../../../components/header/auth-header';
import FormPasswordInput from '@/components/input/form-password-input';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';

type FormData = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	role: string;
	location: string;
	confirmPassword: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	email: '',
	password: '',
	role: 'FARMER',
	location: '',
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

type Checked = DropdownMenuCheckboxItemProps['checked'];

const SignUpPage = () => {
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [location, setLocation] = useState<string>('Abia');
	const [showStatusBar, setShowStatusBar] = useState<Checked>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (
			!formData.email ||
			!formData.firstName ||
			!formData.lastName ||
			!formData.phoneNumber ||
			!formData.password ||
			!location
		) {
			return toast.error('All fields are required!');
		}
		if (formData.password !== formData.confirmPassword) {
			return toast.error('Passwords do not match');
		}

		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {location: location},
		});

		try {
			setLoading(true);
			// console.log('[SIGNUP-PAYLOAD] :: ', formData);

			const {data} = await axios.post('/api/auth/signup', formData);

			// console.log('[DATA] :: ', data);

			if (data?.ok == false) {
				setLoading(false);

				toast.error('An error occurred');
			} else {
				setLoading(false);

				toast.success('Account created successfully');

				router.push('/signin');
			}
		} catch (error) {
			setLoading(false);
			// console.error('[SIGNUP-ERROR]', error);
			toast.error('An error occurred');
		}
	};

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='flex flex-col justify-center items-center  py-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
				>
					<h1 className='text-center text-2xl font-semibold'>
						Farmer Sign Up
					</h1>
					<div className='space-y-4'>
						<FormTextInput
							name='firstName'
							padding='py-3 px-4'
							value={formData.firstName}
							handleChange={handleChange}
							placeHolder='First Name'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
						/>
						<FormTextInput
							name='lastName'
							padding='py-3 px-4'
							value={formData.lastName}
							handleChange={handleChange}
							placeHolder='Last Name'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
						/>
						<FormTextInput
							name='phoneNumber'
							type='number'
							padding='py-3 px-4'
							value={formData.phoneNumber}
							handleChange={handleChange}
							placeHolder='Phone Number'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
						/>
						<FormTextInput
							name='email'
							padding='py-3 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
						/>
						<FormPasswordInput
							name='password'
							padding='py-3 px-4'
							value={formData.password}
							handleChange={handleChange}
							placeHolder='Password'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
						/>
						<FormPasswordInput
							name='confirmPassword'
							padding='py-3 px-4'
							value={formData.confirmPassword}
							handleChange={handleChange}
							placeHolder='Confirm Password'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
						/>

						<div>
							<select
								name='location'
								className='w-full border py-3 rounded px-3 text-xs scrollbar__1'
								onChange={handleSelectChange}
							>
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

						<div className='flex justify-center'>
							<div className='space-x-3 flex items-center'>
								{' '}
								<input
									type='checkbox'
									name='remember-me'
									id=''
								/>
								<p className='text-xs'>
									I agree your{' '}
									<Link href={'#'} className='text-main'>
										Privacy Policy
									</Link>
								</p>
							</div>
						</div>

						{loading ? (
							<Button
								type='button'
								className='bg-green-700 text-white h-12 hover:bg-green-700 w-full rounded-full py-3 cursor-default'
							>
								<ButtonLoader />
							</Button>
						) : (
							<Button
								type='submit'
								className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-3'
							>
								Sign Up
							</Button>
						)}

						<div className='flex items-center justify-between space-x-3'>
							<Separator className='w-[43%]' />
							<span>Or</span>
							<Separator className='w-[43%]' />
						</div>

						<Button
							type='button'
							variant={'outline'}
							className='flex items-center gap-x-4 h-12 justify-center w-full rounded-full py-3'
						>
							<Image
								unoptimized={true}
								alt='google icon'
								src={'/icon_google.svg'}
								width={30}
								height={30}
							/>
							<p>Continue with Google</p>
						</Button>

						<div className='flex justify-center mt-5'>
							<Link
								href='/signin'
								className='text-xs text-center mx-auto'
							>
								Already have an account?{' '}
								<span className='text-main'>Login</span>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpPage;
