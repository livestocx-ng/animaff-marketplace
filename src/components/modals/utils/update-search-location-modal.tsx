'use client';
import {
	useGlobalStore,
	useUpdateSearchLocationModalStore,
} from '@/store/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {NigerianCities, NigerianStates} from '@/data';
import {useEffect, useReducer, useState} from 'react';
import {ChevronLeft, ChevronRight, X} from 'lucide-react';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';

type FormData = {
	search: string;
	showCities: boolean;
	searchLocation: string;
	searchLocationState: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	search: '',
	showCities: false,
	searchLocation: '',
	searchLocationState: 'Abia',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const UpdateSearchLocationModal = () => {
	const router = useRouter();

	const {user, updateSearchLocation, updateProducts} = useGlobalStore();

	const {onClose} = useUpdateSearchLocationModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		});
	}, []);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			// close modal
			onClose();
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			toast.error('Error');
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div
				onClick={() => {
					onClose();
				}}
				className='absolute left-0 top-0 h-screen w-full z-[16] bg-[#11111100]'
			></div>
			<div className='flex flex-col w-[90%] lg:w-[60%] bg-white py-4 px-4 rounded-md overflow-y-auto z-[20] scrollbar__1'>
				<div className='flex flex-col-reverse lg:flex-row items-center justify-between mb-2'>
					{!formData.showCities && (
						<h1 className='text-sm'>All Nigeria</h1>
					)}
					{formData.showCities && (
						<div
							onClick={() => {
								updateFormData({
									type: 'UPDATE_FORMDATA',
									payload: {
										showCities: false,
									},
								});
							}}
							className='flex cursor-pointer hover:translate-x-1 transition-all duration-700'
						>
							<ChevronLeft className='h-5 w-5' />{' '}
							<h1 className='text-sm'>Back</h1>
						</div>
					)}

					{/* <FormTextInput
						name='search'
						padding='py-2 px-4'
						value={formData.search}
						handleChange={handleChange}
						placeHolder='Find state, city or district'
						classes='w-full lg:w-[30%] text-white text-sm placeholder:text-sm placeholder:italic border border-slate-600'
					/> */}
					<div></div>
				</div>

				{!formData.showCities && (
					<div className='flex flex-col lg:grid grid-cols-3 gap-x-8 w-full py-5 border-t border-t-slate-600 max-h-[500px] lg:max-h-[600px] overflow-y-auto scrollbar__1'>
						<div>
							{NigerianStates.slice(0, 13).map((state) => (
								<div
									key={state}
									onClick={() => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												showCities: true,
												searchLocationState: state,
											},
										});
									}}
									className='border-b text-sm py-2 flex justify-between cursor-pointer hover:translate-y-1 transition-all duration-700'
								>
									<p>
										{state === 'Abuja'
											? 'FCT Abuja'
											: `${state} State`}
									</p>{' '}
									<ChevronRight className='text-slate-400' />
								</div>
							))}
						</div>
						<div>
							{NigerianStates.slice(13, 26).map((state) => (
								<div
									key={state}
									onClick={() => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												showCities: true,
												searchLocationState: state,
											},
										});
									}}
									className='border-b text-sm py-2 flex justify-between cursor-pointer hover:translate-y-1 transition-all duration-700'
								>
									<p>
										{state.includes('Federal')
											? 'Abuja (FCT)'
											: `${state} State`}
									</p>{' '}
									<ChevronRight className='text-slate-400' />
								</div>
							))}
						</div>
						<div>
							{NigerianStates.slice(27, 40).map((state) => (
								<div
									key={state}
									onClick={() => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												showCities: true,
												searchLocationState: state,
											},
										});
									}}
									className='border-b text-sm py-2 flex justify-between cursor-pointer hover:translate-y-1 transition-all duration-700'
								>
									<p>
										{state.includes('Federal')
											? 'Abuja (FCT)'
											: `${state} State`}
									</p>{' '}
									<ChevronRight className='text-slate-400' />
								</div>
							))}
						</div>
					</div>
				)}

				{formData.showCities && (
					<div className='flex flex-col lg:grid grid-cols-3 gap-x-8 w-full py-5 border-t border-t-slate-600 max-h-[500px] lg:max-h-[600px] overflow-y-auto scrollbar__1'>
						<div>
							<div
								onClick={() => {
									const location =
										formData.searchLocationState
											.split(/[ /']/)
											.join('-')
											.toLowerCase();

									updateFormData({
										type: 'UPDATE_FORMDATA',
										payload: {
											searchLocation: location,
										},
									});

									updateSearchLocation('', location);

									window.localStorage.setItem(
										'livestocx_search_query',
										JSON.stringify({
											searchQueryState: location,
											searchQueryCity: '',
										})
									);
									router.push(`/${location}`);

									updateProducts([]);

									onClose();
								}}
								className='border-b text-sm py-2 flex justify-between w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
							>
								<p>
									All {formData.searchLocationState}{' '}
									{formData.searchLocationState === 'Abuja'
										? ''
										: `${formData.searchLocationState} State`}
								</p>{' '}
								<ChevronRight className='text-slate-400' />
							</div>
							{NigerianCities[formData.searchLocationState]
								.slice(0, 5)
								.map((city) => (
									<div
										key={city}
										onClick={() => {
											const location = city
												.split(/[ /]/)
												.join('-')
												.split(/'/)
												.join('')
												.toLowerCase();

											// console.log(location);

											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													searchLocation: location,
												},
											});

											updateSearchLocation(
												location,
												formData.searchLocationState.toLowerCase()
											);

											window.localStorage.setItem(
												'livestocx_search_query',
												JSON.stringify({
													searchQueryState:
														formData.searchLocationState,
													searchQueryCity: location,
												})
											);
											router.push(`/${location}`);

											updateProducts([]);

											onClose();
										}}
										className='border-b text-sm py-2 flex flex-col w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
									>
										<div className='flex justify-between'>
											<p>{city}</p>{' '}
											<ChevronRight className='text-slate-400' />
										</div>
										<p className='text-xs text-slate-500'>
											{formData.searchLocationState} State
										</p>{' '}
									</div>
								))}
						</div>
						<div>
							{NigerianCities[formData.searchLocationState]
								.slice(5, 10)
								.map((city) => (
									<div
										key={city}
										onClick={() => {
											const location = city
												.split(/[ /]/)
												.join('-')
												.split(/'/)
												.join('')
												.toLowerCase();

											// console.log(location);

											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													searchLocation: location,
												},
											});

											updateSearchLocation(
												location,
												formData.searchLocationState.toLowerCase()
											);

											window.localStorage.setItem(
												'livestocx_search_query',
												JSON.stringify({
													searchQueryState:
														formData.searchLocationState,
													searchQueryCity: location,
												})
											);
											router.push(`/${location}`);

											updateProducts([]);

											onClose();
										}}
										className='border-b text-sm py-2 flex flex-col w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
									>
										<div className='flex justify-between'>
											<p>{city}</p>{' '}
											<ChevronRight className='text-slate-400' />
										</div>
										<p className='text-xs text-slate-500'>
											{formData.searchLocationState} State
										</p>{' '}
									</div>
								))}
						</div>
						<div>
							{NigerianCities[formData.searchLocationState]
								.slice(10, 20)
								.map((city) => (
									<div
										key={city}
										onClick={() => {
											const location = city
												.split(/[ /]/)
												.join('-')
												.split(/'/)
												.join('')
												.toLowerCase();

											// console.log(location);

											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													searchLocation: location,
												},
											});

											updateSearchLocation(
												location,
												formData.searchLocationState.toLowerCase()
											);

											window.localStorage.setItem(
												'livestocx_search_query',
												JSON.stringify({
													searchQueryState:
														formData.searchLocationState,
													searchQueryCity: location,
												})
											);
											router.push(`/${location}`);

											updateProducts([]);

											onClose();
										}}
										className='border-b text-sm py-2 flex flex-col w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
									>
										<div className='flex justify-between'>
											<p>{city}</p>{' '}
											<ChevronRight className='text-slate-400' />
										</div>
										<p className='text-xs text-slate-500'>
											{formData.searchLocationState} State
										</p>{' '}
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UpdateSearchLocationModal;
