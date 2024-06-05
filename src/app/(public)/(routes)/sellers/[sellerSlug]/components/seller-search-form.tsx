'use client';
import axios, {AxiosError} from 'axios';
import {SellerFilterOptions} from '@/data';
import {Button} from '@/components/ui/button';
import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '@/store/use-global-store';
import FormTextInput from '@/components/input/form-text-input';

type FormData = {
	recommended: boolean | undefined;
	newest: boolean | undefined;
	oldest: boolean | undefined;
	lowestPrice: boolean | undefined;
	highestPrice: boolean | undefined;
};

const initialState: FormData = {
	recommended: false,
	newest: false,
	oldest: false,
	lowestPrice: false,
	highestPrice: false,
};

const SellerInfoSearchForm = () => {
	const {vendor, updateSellerProducts, updateSellerPagination} =
		useGlobalStore();

	const [search, setSearch] = useState<string>('');
	const [formData, updateFormData] = useState(initialState);
	const [filterValue, setFilterValue] = useState<string>('');

	useEffect(() => {
		if (filterValue.length > 0) {
			handleFilterSubmit();
		}
	}, [filterValue]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleFilterSubmit = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/${vendor?.vendorId}/filter-products?search=${search}&recommended=${formData.recommended}&newest=${formData.newest}&oldest=${formData.oldest}&lowestPrice=${formData.lowestPrice}&highestPrice=${formData.highestPrice}`
			);

			updateSellerProducts(data.data.products);
			updateSellerPagination(data.data.totalPages, data.data.hasNext);

			setSearch('');
			updateFormData({
				newest: undefined,
				oldest: undefined,
				lowestPrice: undefined,
				recommended: undefined,
				highestPrice: undefined,
			});
		} catch (error) {
			const _error = error as AxiosError;

			// // console.log('[FILTER-SELLER-PRODUCTS-ERROR] :: ', _error);
		}
	};

	return (
		<div className='flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0'>
			<div
				// onSubmit={handleFilterSubmit}
				className='w-full sm:w-[60%] items-center hidden sm:flex'
			>
				<FormTextInput
					name='search'
					value={search}
					placeHolder='Search...'
					padding='py-4 px-4 pl-6'
					handleChange={handleChange}
					classes='w-[80%] sm:w-[50%] text-sm placeholder:text-sm h-12 border-l border-t border-b focus:border-slate-500 rounded-r-none rounded-l-lg'
				/>
				<Button
					type='button'
					onClick={handleFilterSubmit}
					variant={'outline'}
					className='border-0 bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded-l-none rounded-r-md py-3 w-[20%] sm:w-fit'
				>
					Search
				</Button>
			</div>

			<div className='w-full sm:w-fit'>
				<select
					name='search'
					className='w-full border py-3 rounded px-3 text-xs scrollbar__1'
					onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
						setFilterValue(event.target.value);

						updateFormData({
							recommended: undefined,
							oldest: undefined,
							newest: undefined,
							highestPrice: undefined,
							lowestPrice: undefined,
							[event.target.value]: true,
						});
					}}
				>
					{SellerFilterOptions.map((option) => (
						<option
							key={option.id}
							value={option.value}
							className='cursor-pointer'
						>
							{option.title}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default SellerInfoSearchForm;
