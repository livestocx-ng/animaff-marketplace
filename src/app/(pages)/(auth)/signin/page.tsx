'use client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import {signIn} from 'next-auth/react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import Footer from '@/components/navigation/footer';
import {useGlobalStore} from '@/hooks/use-global-store';
import {useRouter, useSearchParams} from 'next/navigation';
import ButtonLoader from '@/components/loader/button-loader';
import MainNavbar from '@/components/navigation/main-nav-bar';
import FormTextInput from '@/components/input/form-text-input';
import {COOKIE_MAX_AGE, ANIMAFF_AUTH_REDIRECT} from '@/lib/constants';
import FormPasswordInput from '@/components/input/form-password-input';
import {Fragment, Suspense, useEffect, useReducer, useState} from 'react';
import {ValidateSigninFormData} from '@/utils/form-validations/auth.validation';
import {FaStar} from 'react-icons/fa';
import {Testimonial} from '@/types/types';

type FormData = {
	email: string;
	password: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	email: '',
	password: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const SignInPageContent = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const {
		user,
		updateUser,
		updateChatConversations,
		testimonials,
		updateTestimonials,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [formData, updateFormData] = useReducer(formReducer, initialState);
	const [currentTestimonial, setCurrentTestimonial] =
		useState<Testimonial | null>(null);

	const shuffleTestimonials = () => {
		if (testimonials.length === 0) {
			setCurrentTestimonial(null);
			return;
		}

		if (!currentTestimonial) {
			setCurrentTestimonial(testimonials[0]);
		}

		return setInterval(() => {
			setCurrentIndex((prevIndex) => {
				const nextIndex = (prevIndex + 1) % testimonials.length;
				setCurrentTestimonial(testimonials[nextIndex]);
				return nextIndex;
			});
		}, 7000);
	};

	const fetchTestimonials = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/utilities/testimonials`
			);

			updateTestimonials(data.data);
		} catch (error) {
			// const _error = error as AxiosError;
			// console.log('[FETCH-TESTIMONIALS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		const intervalId = shuffleTestimonials();

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [testimonials]);

	useEffect(() => {
		if (user) {
			return router.push('/');
		}

		fetchTestimonials();
	}, [user]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validationError = ValidateSigninFormData(formData);

		if (validationError) {
			setLoading(false);
			return toast.error(validationError, {duration: 10000});
		}

		try {
			setLoading(true);

			// console.log('[SIGNIN-PAYLOAD] :: ', formData);

			const {data} = await axios.post('/api/auth/signin', formData);

			// console.log('[DATA] :: ', data);

			if (data?.ok == false) {
				setLoading(false);

				toast.error('Invalid credentials');
			} else {
				setLoading(false);

				updateUser(data);

				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations?page=1`,
					{
						headers: {
							Authorization: data?.accessToken,
						},
					}
				);

				updateChatConversations(response.data.data.conversations);

				toast.success('Success');

				if (searchParams.has('redirect_to')!) {
					return router.push(
						`/${
							searchParams
								.get('redirect_to')!
								.includes('enterprise')
								? 'enterprise?subscription_now=true'
								: searchParams.get('redirect_to')!
						}`
					);
				} else {
					router.push('/');
				}
			}
		} catch (error) {
			setLoading(false);

			// console.error('[SIGNIN-ERROR]', error);

			toast.error('Invalid credentials');
		}
	};

	return (
		<Fragment>
			<MainNavbar />
			<div className='w-full'>
				<section className='h-[18vh] md:h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
					<h1 className='text-xl md:text-5xl font-medium text-white'>
						Sign In
					</h1>
				</section>

				<div className='flex flex-col justify-center items-center py-20'>
					<form
						autoComplete='off'
						onSubmit={handleSubmit}
						className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
					>
						{/* <h1 className='text-center text-2xl font-semibold'>
							Sign In
						</h1> */}
						<div className='space-y-4'>
							<FormTextInput
								name='email'
								padding='py-4 px-4'
								value={formData.email}
								handleChange={handleChange}
								placeHolder='Email'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
							<FormPasswordInput
								name='password'
								padding='py-4 px-4'
								value={formData.password}
								handleChange={handleChange}
								placeHolder='Password'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>

							<div className='flex justify-between items-center'>
								<div className='space-x-3 flex items-center'>
									{' '}
									<input
										type='checkbox'
										name='remember-me'
										id=''
									/>
									<p className='text-sm'>Remember me</p>
								</div>
								<Link
									href='/forgot-password'
									className='text-sm text-green-600'
								>
									Forgot password?
								</Link>
							</div>

							{loading === true ? (
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
									Sign In
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
								onClick={() => {
									const redirectUrl = searchParams.has(
										'redirect_to'
									)
										? searchParams
												.get('redirect_to')!
												.includes('enterprise')
											? '/enterprise?subscription_now=true'
											: `/${searchParams.get(
													'redirect_to'
											  )!}`
										: '/';

									signIn('google', {
										callbackUrl: redirectUrl,
									});
								}}
								className='flex items-center gap-x-4 h-12 justify-center w-full rounded-full py-4'
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
									href='/signup'
									className='text-sm text-center mx-auto'
								>
									Don't have an account?{' '}
									<span className='text-main'>Register</span>
								</Link>
							</div>
						</div>

						<div className='w-full overflow-x-auto gap-x-2 flex'>
							{currentTestimonial && (
								<div
									// key={data.id}
									className='flex flex-col items-center justify-between space-y-5 border rounded-lg px-4 py-4 md:mb-0'
								>
									<div className='flex space-x-3 items-center justify-center w-full'>
										{[1, 2, 3, 4, 5].map((item) => (
											<FaStar
												key={item}
												className='text-orange-500'
												size={13}
											/>
										))}
									</div>

									<p className='text-center text-[10px] w-full leading-4'>
										{currentTestimonial.testimonial}
									</p>

									<div className='flex flex-col w-full items-center text-main font-medium mt-5'>
										<div className='w-[35px] h-[35px] relative'>
											<Image
												fill
												// width={50}
												// height={50}
												alt='testimonial'
												unoptimized={true}
												src={
													currentTestimonial.avatarUrl
												}
												className='rounded-full object-cover border border-slate-400 shadow-md'
											/>
										</div>

										<p className='text-[10px] text-center'>
											{currentTestimonial.author}
										</p>
									</div>
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

const LoadingState = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			{/* <ButtonLoader /> */}
		</div>
	);
};

// Main page component that provides Suspense boundary
const SignInPage = () => {
	return (
		<Suspense fallback={<LoadingState />}>
			<SignInPageContent />
		</Suspense>
	);
};

export default SignInPage;
