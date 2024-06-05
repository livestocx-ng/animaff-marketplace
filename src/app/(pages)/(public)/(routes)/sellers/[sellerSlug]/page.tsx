'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import SellerBanner from './components/seller-banner';
import PageBanner from '@/components/banner/page-banner';
import {useGlobalStore} from '@/hooks/use-global-store';
import {getVendorIdFromSlug} from '@/utils/slug.formatter';
import SellerInfoSearchForm from './components/seller-search-form';
import SellerInfoProducts from './components/seller-info-products';
import LoadingAnimation from '../../../../../../../public/animations/animation__3.json';

interface SellerInfoPageProps {
	params: {
		sellerSlug: string;
	};
}

const SellerInfoPage = ({params}: SellerInfoPageProps) => {
	const {
		vendor,
		updateVendor,
		sellerProducts,
		updateSellerPagination,
		updateSellerProducts,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchSeller = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/sellers/${getVendorIdFromSlug(params.sellerSlug)}`
			);

			// // console.log('[DATA] ::  ', profile.data);
			// console.log('[DATA] ::  ', products.data);

			updateVendor(data.data);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	const fetchSellerProducts = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/sellers/${getVendorIdFromSlug(
					params.sellerSlug
				)}/products?page=${currentPage}`
			);

			// // console.log('[DATA] ::  ', profile.data);
			// console.log('[DATA] ::  ', products.data);

			updateSellerProducts(data.data.products);
			updateSellerPagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchSeller();
	}, []);

	useEffect(() => {
		fetchSellerProducts();
	}, [currentPage]);

	return (
		<main className='bg-[#28312B]'>
			<section className='h-[22vh] md:h-[220px] w-full bg-home flex flex-col items-center justify-center'>
				<h1 className='text-base md:text-5xl font-medium text-white text-center'>
					{vendor?.name}
				</h1>

				{/* <SearchForm /> */}
			</section>

			{loading && (
				<div className='w-full bg-white h-[100vh] flex flex-col items-center justify-center'>
					<div className='h-[400px] w-1/2 mx-auto'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={LoadingAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && vendor && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 py-5 space-y-2 sm:space-y-5'>
					<SellerBanner />

					<div className='flex items-center justify-between w-full'>
						<SellerInfoSearchForm />
					</div>

					<PageBanner
						text={`${sellerProducts?.length} Products Found`}
					/>

					<SellerInfoProducts
						currentPage={currentPage}
						updateCurrentPage={setCurrentPage}
					/>
				</div>
			)}
		</main>
	);
};

export default SellerInfoPage;
