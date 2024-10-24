'use client';
import {
	useGlobalStore,
	useUpdateSearchLocationModalStore,
} from '@/hooks/use-global-store';
import {Suspense, useEffect, useReducer} from 'react';
import {RegionCities, RegionStates} from '@/data';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';

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
	const searchParams = useSearchParams();

	const {updateSearchLocation, updateProducts} = useGlobalStore();

	const {onClose} = useUpdateSearchLocationModalStore();

	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		});
	}, []);

	return (
		<Suspense fallback={<div></div>}>
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
							<h1 className='text-xs font-semibold'>
								All United States
							</h1>
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
								<ChevronLeft size={14} className='h-5 w-5' />{' '}
								<h1 className='text-xs font-semibold'>Back</h1>
							</div>
						)}

						<div></div>
					</div>

					{!formData.showCities && (
						<div className='flex flex-col lg:grid grid-cols-3 gap-x-8 w-full py-5 border-t border-t-slate-600 max-h-[500px] lg:max-h-[600px] overflow-y-auto scrollbar__1'>
							<div>
								{RegionStates.slice(0, 13).map((state) => (
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
										className='border-b text-xs py-2 flex justify-between cursor-pointer hover:translate-y-1 transition-all duration-700'
									>
										<p>{state}</p>
										<ChevronRight
											size={14}
											className='text-black'
										/>
									</div>
								))}
							</div>
							<div>
								{RegionStates.slice(13, 26).map((state) => (
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
										className='border-b text-xs py-2 flex justify-between cursor-pointer hover:translate-y-1 transition-all duration-700'
									>
										<p>{state}</p>
										<ChevronRight
											size={14}
											className='text-black'
										/>
									</div>
								))}
							</div>
							<div>
								{RegionStates.slice(27, 40).map((state) => (
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
										className='border-b text-xs py-2 flex justify-between cursor-pointer hover:translate-y-1 transition-all duration-700'
									>
										<p>{state}</p>
										<ChevronRight
											size={14}
											className='text-black'
										/>
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
											'animaff_search_query',
											JSON.stringify({
												searchQueryState: location,
												searchQueryCity: '',
											})
										);
										// router.push(`/${location}`);

										// updateProducts([]);

										const updatedSearchParams =
											new URLSearchParams(
												searchParams.toString()
											);

										updatedSearchParams.set(
											'query',
											searchParams.has('query')
												? searchParams.get('query')!
												: ''
										);
										updatedSearchParams.set(
											'state',
											encodeURI(location)
										);
										updatedSearchParams.set(
											'city',
											searchParams.has('city')
												? searchParams.get('city')!
												: ''
										);

										router.push(
											`/search?${updatedSearchParams}`
										);

										onClose();
									}}
									className='border-b text-xs py-2 flex justify-between w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
								>
									<p>All {formData.searchLocationState}</p>
									<ChevronRight
										size={14}
										className='text-black'
									/>
								</div>
								{RegionCities[formData.searchLocationState]
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
														searchLocation:
															location,
													},
												});

												updateSearchLocation(
													location,
													formData.searchLocationState.toLowerCase()
												);

												window.localStorage.setItem(
													'animaff_search_query',
													JSON.stringify({
														searchQueryState:
															formData.searchLocationState,
														searchQueryCity:
															location,
													})
												);
												// router.push(`/${location}`);

												// updateProducts([]);
												const updatedSearchParams =
													new URLSearchParams(
														searchParams.toString()
													);

												updatedSearchParams.set(
													'query',
													searchParams.has('query')
														? searchParams.get(
																'query'
														  )!
														: ''
												);
												updatedSearchParams.set(
													'state',
													encodeURI(
														formData.searchLocationState
													)
												);
												updatedSearchParams.set(
													'city',
													encodeURI(location)
												);

												router.push(
													`/search?${updatedSearchParams}`
												);

												onClose();
											}}
											className='border-b text-xs py-2 flex flex-col w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
										>
											<div className='flex justify-between'>
												<p>{city}</p>
												<ChevronRight
													size={14}
													className='text-black'
												/>
											</div>
										</div>
									))}
							</div>
							<div>
								{RegionCities[formData.searchLocationState]
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
														searchLocation:
															location,
													},
												});

												updateSearchLocation(
													location,
													formData.searchLocationState.toLowerCase()
												);

												window.localStorage.setItem(
													'animaff_search_query',
													JSON.stringify({
														searchQueryState:
															formData.searchLocationState,
														searchQueryCity:
															location,
													})
												);
												// router.push(`/${location}`);

												// updateProducts([]);

												const updatedSearchParams =
													new URLSearchParams(
														searchParams.toString()
													);

												updatedSearchParams.set(
													'query',
													searchParams.has('query')
														? searchParams.get(
																'query'
														  )!
														: ''
												);
												updatedSearchParams.set(
													'state',
													encodeURI(
														formData.searchLocationState
													)
												);
												updatedSearchParams.set(
													'city',
													encodeURI(location)
												);

												router.push(
													`/search?${updatedSearchParams}`
												);

												onClose();
											}}
											className='border-b text-xs py-2 flex flex-col w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
										>
											<div className='flex justify-between'>
												<p>{city}</p>
												<ChevronRight
													size={14}
													className='text-black'
												/>
											</div>
										</div>
									))}
							</div>
							<div>
								{RegionCities[formData.searchLocationState]
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
														searchLocation:
															location,
													},
												});

												updateSearchLocation(
													location,
													formData.searchLocationState.toLowerCase()
												);

												window.localStorage.setItem(
													'animaff_search_query',
													JSON.stringify({
														searchQueryState:
															formData.searchLocationState,
														searchQueryCity:
															location,
													})
												);
												// router.push(`/${location}`);

												// updateProducts([]);
												const updatedSearchParams =
													new URLSearchParams(
														searchParams.toString()
													);

												updatedSearchParams.set(
													'query',
													searchParams.has('query')
														? searchParams.get(
																'query'
														  )!
														: ''
												);
												updatedSearchParams.set(
													'state',
													encodeURI(
														formData.searchLocationState
													)
												);
												updatedSearchParams.set(
													'city',
													encodeURI(location)
												);

												router.push(
													`/search?${updatedSearchParams}`
												);

												onClose();
											}}
											className='border-b text-xs py-2 flex flex-col w-full cursor-pointer hover:translate-y-1 transition-all duration-700'
										>
											<div className='flex justify-between'>
												<p>{city}</p>
												<ChevronRight
													size={14}
													className='text-black'
												/>
											</div>
										</div>
									))}
							</div>
						</div>
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default UpdateSearchLocationModal;
