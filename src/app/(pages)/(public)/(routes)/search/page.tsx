'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useSearchParams} from 'next/navigation';
import {Fragment, Suspense, useEffect, useState} from 'react';
import Footer from '@/components/navigation/footer';
import SearchForm from '@/components/home/search-form';
import {useGlobalStore} from '@/hooks/use-global-store';
import SearchProducts from './components/search-products';
import MainNavbar from '@/components/navigation/main-nav-bar';
import PromotionBanner from '@/components/banner/promotion-banner';
import LoadingAnimationOne from '@/components/loader/loading-animation-one';
import ProductCardSkeleton from '@/components/skeletons/product-card-skeleton';
import EmptyAnimation from '../../../../../../public/animations/animation__3.json';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const searchCity = searchParams.has('city') ? searchParams.get('city') : '';
	const searchQuery = searchParams.has('query')
		? searchParams.get('query')
		: '';
	const searchState = searchParams.has('state')
		? searchParams.get('state')
		: '';

	const {user, searchProducts, updateSearchProducts, updateSearchPagination} =
		useGlobalStore();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchProducts = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/search?state=${searchState}&city=${searchCity}&query=${searchQuery!}&category=&page=${currentPage}&user=${
					user ? user?.id : 0
				}`
			);

			// console.log('[PRODUCTS] :: ', data.data);

			updateSearchProducts(data.data.products);

			updateSearchPagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchPaginatedProducts = async () => {
		try {
			// setLoading(true);

			const {data} = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/search?state=&city=&query=${searchQuery!}&category=&page=${currentPage}&user=${
					user ? user?.id : 0
				}`
			);

			if (currentPage === 1) {
				updateSearchProducts(data.data.products);
			} else {
				updateSearchProducts([
					...searchProducts,
					...data.data.products,
				]);
			}

			updateSearchPagination(data.data.totalPages, data.data.hasNext);

			// setLoading(false);
		} catch (error) {
			// setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [searchParams]);

	useEffect(() => {
		fetchPaginatedProducts();
	}, [currentPage]);

	return (
		<Suspense fallback={<div></div>}>
			<Fragment>
				<MainNavbar />
				<main className='bg-[#28312B]'>
					<section className='h-[28vh] md:h-[320px] w-full bg-white md:bg-home flex flex-col items-center justify-end gap-y-3 md:gap-y-8 py-2 md:py-10 md:pb-2'>
						<h1 className='text-lg md:text-4xl font-medium text-black md:text-white'>
							Search
						</h1>

						<SearchForm />
					</section>

					{loading && searchProducts?.length > 0 && (
						<div className='flex flex-col w-full bg-white px-4 md:px-8 sm:pt-6 pb-10 relative'>
							<PromotionBanner />

							<div className='w-full bg-white h-[60vh] flex flex-col items-center justify-center'>
								<LoadingAnimationOne />
							</div>
						</div>
					)}

					{loading && searchProducts?.length === 0 && (
						<div className='flex flex-col w-full bg-white px-4 md:px-8 sm:pt-6 pb-10 relative'>
							<PromotionBanner />

							<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 pt-5 sm:pt-0 mt-16 md:mt-5'>
								{Array(50)
									.fill(1)
									.map((item, index) => (
										<ProductCardSkeleton key={index} />
									))}
							</div>
						</div>
					)}

					{!loading && searchProducts?.length === 0 && (
						<div className='w-full bg-white h-[70vh] flex flex-col items-center justify-center'>
							<div className='h-[200px] w-1/2 mx-auto bg-white'>
								<Lottie
									loop={false}
									className='h-full'
									animationData={EmptyAnimation}
								/>
							</div>
						</div>
					)}

					{!loading && searchProducts?.length > 0 && (
						<div className='flex flex-col w-full bg-white px-4 md:px-8 pt-10 sm:pt-10 pb-10 relative'>
							<PromotionBanner />

							<SearchProducts
								currentPage={currentPage}
								updateCurrentPage={setCurrentPage}
							/>
						</div>
					)}
				</main>
				<Footer />
			</Fragment>
		</Suspense>
	);
}
