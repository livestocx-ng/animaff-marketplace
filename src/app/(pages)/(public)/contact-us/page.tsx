'use client';
import {toast} from 'react-hot-toast';
import {Fragment, useReducer, useState} from 'react';
import {Button} from '@/components/ui/button';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import FormTextAreaInput from '@/components/input/form-text-area-input';
import YoutubeVideoPlayer from '@/components/media/youtube-video-player';
import {ValidateContactUsFormData} from '@/utils/form-validations/contact-us.validation';
import Image from 'next/image';
import Link from 'next/link';
import {Plus} from 'lucide-react';
import {FaqItems} from '@/data';
import FaqAccordionCard from '@/components/cards/faq-accordion-card';
import axios, {AxiosError} from 'axios';
import Footer from '@/components/navigation/footer';
import MainNavbar from '@/components/navigation/main-nav-bar';

type FormData = {
	email: string;
	firstName: string;
	lastName: string;
	message: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	email: '',
	firstName: '',
	lastName: '',
	message: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const ContactUsPage = () => {
	const [open, setOpen] = useState<any>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentItem, setCurrentItem] = useState<number>(0);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleFaqToggle = (index: number) => {
		if (currentItem === index && open) {
			return setOpen(false);
		}
		if (currentItem === index && !open) {
			return setOpen(true);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validationError = ValidateContactUsFormData(formData);

		if (validationError) {
			setLoading(false);
			return toast.error(validationError, {duration: 10000});
		}

		try {
			setLoading(true);
			// console.log('[CONTACT-US-PAYLOAD] :: ', formData);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/notifications/contact-us`,
				formData
			);

			// console.log('[DATA] :: ', data);

			toast.success(
				'Thank you for your message, we will reply you shortly.'
			);

			setLoading(false);

			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {
					email: '',
					message: '',
					lastName: '',
					firstName: '',
				},
			});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.error('[SIGNIN-ERROR]', _error);

			toast.error('An error occurred!');
		}
	};

	return (
		<Fragment>
			<MainNavbar />
			<main>
				<section className='h-[50vh] md:h-[50vh] w-full bg-home flex flex-col items-center justify-center pt-28 md:pt-0'>
					<h1 className='text-xl md:text-5xl font-medium text-white'>
						Get In Touch
					</h1>
				</section>

				<div className='w-full py-5 text-center'>
					<h1 className='text-xl md:text-2xl font-semibold text-mai'>
						Send us a message!
					</h1>
				</div>

				<div className='flex flex-wrap items-start justify-between w-full px-4 md:px-8 sm:py-10 mt-10 sm:mt-0'>
					<form
						onSubmit={handleSubmit}
						className='w-full sm:w-[60%] flex flex-col space-y-5 md:pr-5'
					>
						<div className='w-full flex flex-col md:flex-row justify-between items-center'>
							<div className='w-full md:w-[48%]'>
								<h1 className='text-sm'>First Name</h1>
								<FormTextInput
									name='firstName'
									disabled={loading}
									padding='py-4 px-4'
									value={formData.firstName}
									handleChange={handleChange}
									placeHolder='First name'
									classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
								/>
							</div>
							<div className='w-full md:w-[48%]'>
								<h1 className='text-sm'>Last Name</h1>
								<FormTextInput
									name='lastName'
									disabled={loading}
									padding='py-4 px-4'
									value={formData.lastName}
									handleChange={handleChange}
									placeHolder='Last name'
									classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
								/>
							</div>
						</div>
						<div className='w-full'>
							<h1 className='text-sm'>Email</h1>
							<FormTextInput
								name='email'
								disabled={loading}
								padding='py-4 px-4'
								value={formData.email}
								handleChange={handleChange}
								placeHolder='Email'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='w-full'>
							<h1 className='text-sm'>Message</h1>
							<FormTextAreaInput
								rows={8}
								name='message'
								disabled={loading}
								padding='py-4 px-4'
								value={formData.message}
								handleChange={handleChange}
								placeHolder='Message'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded resize-none scrollbar__1'
							/>
						</div>
						{loading === true ? (
							<Button
								type='button'
								className='bg-main text-white h-12 hover:bg-main w-full rounded py-4 cursor-default'
							>
								<ButtonLoader />
							</Button>
						) : (
							<Button
								type='submit'
								className='bg-main text-white h-12 hover:bg-main w-full rounded py-4'
							>
								Send
							</Button>
						)}
					</form>
					<div className='w-full h-[300px] md:w-[40%] md:h-[480px] mt-10 sm:mt-0 relative'>
						{/* <YoutubeVideoPlayer videoId='_EoteodbpbU' /> */}
						<Image
							fill
							alt=''
							unoptimized={true}
							src={'/about__art__4.svg'}
							className='object-fill w-full h-full'
						/>
					</div>
				</div>

				<div className='w-full px-4 md:px-8 mt-20 sm:mt-0'>
					<div className='border border-main flex flex-wrap items-center justify-between p-5 md:p-10 gap-10'>
						<div className='flex flex-col items-center w-full md:w-[300px] space-y-5 bg-white shadow-lg rounde py-10'>
							<Image
								alt=''
								width={40}
								height={40}
								unoptimized={true}
								src={'/icon__phone.svg'}
							/>
							<h1 className='font-semibold text-main'>
								Give us a call today!
							</h1>

							<p>+234 (0) 806 289 9590</p>
						</div>

						<div className='flex flex-col items-center w-full md:w-[300px] space-y-5 bg-white shadow-lg rounde py-10'>
							<Image
								alt=''
								width={40}
								height={40}
								unoptimized={true}
								src={'/icon__messages.svg'}
							/>
							<h1 className='font-semibold text-main'>
								Connect with us!
							</h1>

							<div className='flex items-center space-x-3'>
								<Link
									target='_blank'
									href={
										'https://www.facebook.com/profile.php?id=61550763699954'
									}
									className='bg-main h-[25px] w-[25px] relative rounded p-3'
								>
									<Image
										fill
										unoptimized={true}
										className='object-fill'
										alt={'livestocx-facebook'}
										src={'/icon__facebook__2.svg'}
									/>
								</Link>
								<Link
									target='_blank'
									href={
										'https://www.linkedin.com/company/livestocxltd/'
									}
									className='bg-main h-[25px] w-[25px] relative rounded p-3'
								>
									<Image
										fill
										className='object-fill'
										unoptimized={true}
										alt={'livestocx-facebook'}
										src={'/icon__linkedin__2.svg'}
									/>
								</Link>
								<Link
									target='_blank'
									href={
										'https://instagram.com/livestocx?igshid=MzNlNGNkZWQ4Mg=='
									}
									className='bg-main h-[25px] w-[25px] relative rounded p-3'
								>
									<Image
										fill
										unoptimized={true}
										className='object-fill'
										alt={'livestocx-facebook'}
										src={'/icon__instagram__2.svg'}
									/>
								</Link>
							</div>
						</div>

						<div className='flex flex-col items-center w-full md:w-[300px] space-y-5 bg-white shadow-lg rounde py-10'>
							<Image
								alt=''
								width={40}
								height={40}
								unoptimized={true}
								src={'/icon__sms.svg'}
							/>
							<h1 className='font-semibold text-main'>
								Send us an Email!
							</h1>

							<p>livestocxltd@gmail.com</p>
						</div>
					</div>
				</div>

				<div className='w-full pt-20 pb-10 text-center'>
					<h1 className='text-2xl font-semibold text-mai'>FAQs</h1>
				</div>

				<div className='w-full px-4 md:px-8 pb-20'>
					{FaqItems.map((item, index) => (
						<FaqAccordionCard
							data={item}
							key={item.id}
							open={open && currentItem === index}
							toggle={() => {
								setCurrentItem(index);
								handleFaqToggle(index);
							}}
						/>
					))}
				</div>
			</main>

			<Footer />
		</Fragment>
	);
};

export default ContactUsPage;
