'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
	useGlobalStore,
	useUpdateSearchLocationModalStore,
} from '@/store/use-global-store';
import axios, {AxiosError} from 'axios';
import {usePathname} from 'next/navigation';
import {MapPin, Search} from 'lucide-react';
import {Button} from '@/components/ui/button';
import React, {useEffect, useReducer, useState} from 'react';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';

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
	const pathName = usePathname();

	const {
		user,
		searchQuery,
		searchQueryCity,
		searchQueryState,
		updateSearchQuery,
		updateVendors,
		updateProducts,
		updatePagination,
	} = useGlobalStore();

	const updateSearchLocationModal = useUpdateSearchLocationModalStore();

	const [loading, setLoading] = useState<boolean>(false);
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
		if (searchQuery) {
			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {
					query: searchQuery,
				},
			});
		}
	}, []);

	useEffect(() => {
		if (formData.query === '' && !pathName.includes('sellers')) {
			fetchProducts();
		}

		if (formData.query === '' && pathName.includes('sellers')) {
			fetchSellers();
		}

		if (formData.query.trim().length > 2 || formData.location) {
			handleSearch();
		}
	}, [formData.query, formData.location]);

	const fetchProducts = async () => {
		try {
			if (pathName.split('/')[1] === '') {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all`
				);

				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);
			} else {
				const {data} = await axios.get(
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/search?state=${searchQueryState.toLowerCase()}&city=${searchQueryCity.toLowerCase()}&query=${searchQuery}&category=&page=1`
				);

				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);
			}
			// // console.log('[DATA] ::  ', data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchSellers = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/fetch-all?page=1`
			);

			// // console.log('[DATA] ::  ', data);

			updateVendors(data.data.vendors);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[SEARCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const handleSearch = async () => {
		try {
			setLoading(true);

			if (
				pathName.split('/')[1] === '' &&
				!pathName.includes('sellers')
			) {
				const {data} = await axios.get(
					// `${process.env.NEXT_PUBLIC_API_URL}/user/products/search?query=${formData.query}&location=${formData.location}`
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/search?state=${formData.location}&city=${
						formData.location
					}&query=${formData.query}&category=&page=1&user=${
						user ? user?.id : 0
					}`
				);

				updateProducts([]);
				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			} else if (
				pathName.split('/')[1] !== '' &&
				!pathName.includes('sellers') &&
				!pathName.includes('marketplace')
			) {
				const {data} = await axios.get(
					`${
						process.env.NEXT_PUBLIC_API_URL
						// }/user/products/fetch-location-products?state=${searchQueryState.toLowerCase()}&city=${searchQueryCity.toLowerCase()}&query=${
						// 	formData.query
						// }&page=1`
					}/user/products/search?state=${searchQueryState.toLowerCase()}&city=${searchQueryCity.toLowerCase()}&query=${searchQuery}&category=&page=1&user=${
						user ? user?.id : 0
					}`
				);

				updateProducts([]);
				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			} else if (pathName.includes('marketplace')) {
				const {data} = await axios.get(
					// `${process.env.NEXT_PUBLIC_API_URL}/user/products/search?query=${formData.query}&location=${formData.location}`
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/search?state=${searchQueryState.toLowerCase()}&city=${searchQueryCity.toLowerCase()}&query=${searchQuery}&category=&page=1&user=${
						user ? user?.id : 0
					}`
				);

				// console.log('[DATA] ::  ', data);

				updateProducts([]);
				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			} else {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/search-sellers?query=${formData.query}&location=${formData.location}`
				);

				// // console.log('[DATA] ::  ', data);

				updateVendors(data.data.vendors);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			}
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			{!pathName.includes('sellers') &&
				!pathName.includes('marketplace') && (
					<div className='flex items-center space-x-3 pb-2 md:pb-0'>
						<Link
							className=''
							target='_blank'
							href={
								'https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile&pcampaignid=web_share'
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
							onClick={() => updateSearchLocationModal.onOpen()}
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
					className='bg-slate-800 cursor-pointer text-white text-sm px-4 pl-2 py-2 flex items-center capitalize rounded-md'
				>
					&nbsp;
					<MapPin className='h-5 w-5' />{' '}
					{searchQueryCity ? searchQueryCity : searchQueryState}
				</p>
			</div>
			<div className='flex w-full justify-center items-center gap-x-5 relative'>
				<FormTextInput
					name='query'
					value={formData.query}
					handleChange={handleChange}
					padding='px-5 py-[10px] md:py-3'
					placeHolder='What are you looking for?'
					classes='w-[70%] md:w-[60%] bg-[#00A65120] text-black md:text-white text-sm placeholder:text-xs placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
				/>

				{loading ? (
					<Button
						type='button'
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<ButtonLoader />
					</Button>
				) : (
					<Button
						type='button'
						onClick={handleSearch}
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<Search className='h-12 w-12 text-white' />
					</Button>
				)}
			</div>
		</div>
	);
};

export default SearchForm;
