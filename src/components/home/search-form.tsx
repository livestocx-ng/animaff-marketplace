'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
	useGlobalStore,
	useUpdateSearchLocationModalStore,
} from '@/hooks/use-global-store';
import {MapPin, Search} from 'lucide-react';
import {Button} from '@/components/ui/button';
import React, {Suspense, useEffect, useReducer} from 'react';
import FormTextInput from '@/components/input/form-text-input';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

type FormData = {
	query: string;
	location: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	query: '',
	location: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const SearchForm = () => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const {searchQueryCity, searchQueryState, updateSearchQuery} =
		useGlobalStore();

	const updateSearchLocationModal = useUpdateSearchLocationModalStore();

	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				query: event.target.value,
			},
		});

		updateSearchQuery(event.target.value);
	};

	useEffect(() => {
		if (searchParams.has('query')) {
			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {
					query: searchParams.get('query')!,
				},
			});
		}
	}, [searchParams.has('query')]);

	return (
		<Suspense fallback={<div></div>}>
			<div className='w-full flex flex-col justify-center items-center'>
				{!pathName.includes('sellers') &&
					!pathName.includes('marketplace') && (
						<div className='flex items-center space-x-3 pb-2 md:pb-0'>
							 <Link
							className=''
							target='_blank'
							href={
								'https://play.google.com/store/apps/details?id=com.livestocx.animaff&pcampaignid=web_share'
							}
						>
							<Image
								alt={''}
								width={130}
								height={60}
								unoptimized={true}
								className='object-contain'
								src={'/icon__playstore__2.svg'}
							/>
						</Link> 

							<p
								onClick={() =>
									updateSearchLocationModal.onOpen()
								}
								className='bg-slate-800 cursor-pointer text-white text-xs md:text-sm px-4 pl-2 py-2 flex md:hidden items-center capitalize rounded-md'
							>
								&nbsp;
								<MapPin className='h-5 w-5' />{' '}
								{searchQueryCity
									? searchQueryCity
									: searchQueryState}
							</p>
						</div>
					)}
				<div className='text-white text-sm hidden md:flex items-center space-x-2 py-2'>
					<p> Find anything Livestock in </p>
					<p
						onClick={() => updateSearchLocationModal.onOpen()}
						className='bg-slate-800 cursor-pointer text-white text-xs px-4 pl-2 py-2 flex items-center capitalize rounded-md'
					>
						&nbsp;
						<MapPin size={14} />{' '}
						{searchQueryCity ? searchQueryCity : searchQueryState}
					</p>
				</div>
				<form
					onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();

						if (formData.query.trim().length === 0) return;

						const updatedSearchParams = new URLSearchParams(
							searchParams.toString()
						);

						updatedSearchParams.set(
							'query',
							encodeURI(formData.query)
						);
						updatedSearchParams.set(
							'state',
							searchParams.has('state')
								? searchParams.get('state')!
								: ''
						);
						updatedSearchParams.set(
							'city',
							searchParams.has('city')
								? searchParams.get('city')!
								: ''
						);

						router.push(`/search?${updatedSearchParams}`);
					}}
					className='flex w-full justify-center items-center gap-x-5 relative'
				>
					<FormTextInput
						name='query'
						value={formData.query}
						handleChange={handleChange}
						padding='px-5 py-[10px] md:py-3'
						placeHolder='What are you looking for?'
						classes='w-[70%] md:w-[60%] bg-[#00A65120] text-black md:text-white text-sm placeholder:text-xs placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
					/>

					<Button
						type='submit'
						// onClick={handleSearch}
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<Search className='h-12 w-12 text-white' />
					</Button>
				</form>
			</div>
		</Suspense>
	);
};

export default SearchForm;
