'use client';
import {useEffect} from 'react';
import Lottie from 'lottie-react';
import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import SearchForm from '../components/search-form';
import {useGlobalStore} from '@/store/use-global-store';
import MarketplaceProducts from './components/marketplace-products';
import MarketplaceFilterForm from './components/marketplace-filterform';
import EmptyAnimation from '../../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../../public/animations/loading__animation__1.json';

const MarketPlacePage = () => {
	const userStore = useUserHook();
	const {products, updateProducts, updatePagination} = useGlobalStore();
	const [currentPage, setCurrentPage] = useState<number>(1);

	const [loading, setLoading] = useState(true);

	const fetchMarketPlaceProducts = async () => {
		try {
			setLoading(true);

			if (currentPage > 1) setLoading(false);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/marketplace/fetch-all?page=${currentPage}`
			);

			// // console.log('[DATA] ::  ', data);

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
		fetchMarketPlaceProducts();
	}, [currentPage]);

	return (
		<div className='w-full'>
			<section className='h-[25vh] md:h-[380px] w-full bg-white md:bg-home flex flex-col items-center justify-end gap-y-3 md:gap-y-10 py-2 pt20 md:py-10 md:pt-0'>
				<h1 className='text-lg md:text-5xl font-medium text-white'>
					Marketplace
				</h1>

				<SearchForm />
			</section>

			<div className='w-full flex flex-col pb-20'>
				<MarketplaceFilterForm />

				{loading && (
					<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
						<div className='h-[200px] w-1/2 mx-auto bg-white'>
							<Lottie
								loop={true}
								className='h-full'
								animationData={LoadingAnimation}
							/>
						</div>
					</div>
				)}

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
					<div className='flex flex-col w-full bg-white px-4 md:px-8 pt-2 pb-10'>
						<MarketplaceProducts
							currentPage={currentPage}
							updateCurrentPage={setCurrentPage}
						/>
					</div>
				)}

				{/* {!loading && products?.length > 0 && (
					<MarketplaceProducts currentPage={currentPage} updateCurrentPage={setCurrentPage} />
				)} */}
			</div>
		</div>
	);
};

export default MarketPlacePage;
