'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '@/store/use-global-store';
import AuthHeader from '@/components/header/auth-header';
import MarketplaceProducts from '../components/marketplace-products';
import MarketplaceFilterForm from '../components/marketplace-filterform';
import Animation1 from '../../../../../../../public/animations/animation__2.json';

interface MarketPlaceFilterPageProps {
	params: {
		category: string;
	};
}

const MarketPlaceFilterPage = ({params}: MarketPlaceFilterPageProps) => {
	const {products, updateProducts, updatePagination} = useGlobalStore();

	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchMarketPlaceFilteredProducts = async () => {
		try {
			const {data} = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/marketplace/fetch-all?category=${params.category.toUpperCase()}&page=${currentPage}`
			);

			// console.log('[DATA] ::  ', data);

			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchMarketPlaceFilteredProducts();
	}, []);

	return (
		<div className='w-full'>
			<section className='sm:h-[35vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 pb-20 sm:pb-0 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white capitalize'>
					{params?.category}
				</h1>

				{/* <SearchForm /> */}
			</section>

			<div className='w-full flex flex-col pb-20'>
				<div className='flex items-center justify-between w-full mb-3'>
					<h1 className='px-4 pt-5 text-lg'>
						You searched for "
						<span className='text-main capitalize'>
							{params.category}
						</span>
						"
					</h1>

					<MarketplaceFilterForm />
				</div>

				{products && products?.length === 0 && (
					<div className='h-[400px] w-1/2 mx-auto'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={Animation1}
							// animationData={'/animations/animation__1.json'}
							// animationData={'/animations/loading__animation.json'}
						/>
					</div>
				)}

				{products && products?.length > 0 && (
					<MarketplaceProducts
						currentPage={currentPage}
						updateCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
};

export default MarketPlaceFilterPage;
