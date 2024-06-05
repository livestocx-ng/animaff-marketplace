'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import SearchForm from '../components/search-form';
import HomeProducts from '../components/home-products';
import {useGlobalStore} from '@/store/use-global-store';
import PromotionBanner from '@/components/banner/promotion-banner';
import EmptyAnimation from '../../../../../public/animations/animation__3.json';

interface SearchLocationPageParams {
	params: {
		location: string;
	};
}

const SearchLocationPage = ({params}: SearchLocationPageParams) => {
	const {
		products,
		updateProducts,
		searchQuery,
		searchQueryCity,
		searchQueryState,
		updatePagination,
		updateSearchLocation,
	} = useGlobalStore();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchProducts = async () => {
		try {
			setLoading(false);

			// console.log(currentPage);

			const {data} = await axios.get(
				// `${process.env.NEXT_PUBLIC_API_URL}/user/products/fetch-location-products?state=${searchQueryState.toLowerCase()}&city=${searchQueryCity.toLowerCase()}&query=${searchQuery}&page=${currentPage}`
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/search?state=${searchQueryState.toLowerCase()}&city=${searchQueryCity.toLowerCase()}&query=${searchQuery}&category=&page=${currentPage}`
			);

			// console.log('[DATA] ::  ', data);

			updateProducts([]);
			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-LOCATION-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		const lsQueryParams =
			window.localStorage.getItem('livestocx_search_query') !== null
				? window.localStorage.getItem('livestocx_search_query')
				: '';

		const queryParams: {
			searchQueryState: string;
			searchQueryCity: string;
		} = JSON.parse(lsQueryParams ?? '');

		// console.log(queryParams);

		updateSearchLocation(
			queryParams?.searchQueryCity,
			queryParams?.searchQueryState
		);
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [searchQueryState, searchQueryCity, currentPage]);

	return (
		<main className='bg-[#28312B]'>
			<section className='h-[22vh] md:h-[50vh md:h-[300px] w-full bg-white md:bg-home flex flex-col items-center justify-end gap-y-3 md:gap-y-10 py-2 md:py-10 md:pt-0'>
				{/* <h1 className='text-xl md:text-4xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1> */}

				<SearchForm />
			</section>

			{!loading && products?.length === 0 && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={false}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && products?.length > 0 && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 pt-16 sm:pt-[44px] pb-10 relative'>
					<PromotionBanner />

					<HomeProducts
						currentPage={currentPage}
						updateCurrentPage={setCurrentPage}
					/>
				</div>
			)}
		</main>
	);
};

export default SearchLocationPage;
