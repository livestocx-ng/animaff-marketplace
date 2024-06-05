'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import SearchForm from './components/search-form';
import HomeProducts from './components/home-products';
import {useGlobalStore} from '@/hooks/use-global-store';
import TestimonialSection from '@/components/common/testimonials';
import PromotionBanner from '@/components/banner/promotion-banner';
import EmptyAnimation from '../../../../../public/animations/animation__3.json';

export default function HomePage() {
	const {products, updateProducts, updatePagination, updateSearchLocation} =
		useGlobalStore();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchProducts = async () => {
		try {
			setLoading(false);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all?page=${currentPage}`
			);

			updateProducts([]);
			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		updateSearchLocation('Nigeria', 'Nigeria');
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	return (
		<main className='bg-[#28312B]'>
			<section className='h-[28vh] md:h-[320px] w-full bg-white md:bg-home flex flex-col items-center justify-end gap-y-3 md:gap-y-10 py-2 md:py-10 md:pb-2'>
				<h1 className='text-lg md:text-4xl font-medium text-black md:text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Animals</span>
				</h1>

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

			<TestimonialSection />
		</main>
	);
}
