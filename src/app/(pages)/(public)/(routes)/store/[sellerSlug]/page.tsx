'use client';
import axios, {AxiosError} from 'axios';
import SellerBanner from './components/seller-banner';
import {useGlobalStore} from '@/hooks/use-global-store';
import PageBanner from '@/components/banner/page-banner';
import React, {Fragment, useEffect, useState} from 'react';
import MainNavbar from '@/components/navigation/main-nav-bar';
import SellerInfoSearchForm from './components/seller-search-form';
import SellerInfoProducts from './components/seller-info-products';
import LoadingAnimationOne from '@/components/loader/loading-animation-one';
import SellerFooter from './components/seller-footer';

interface SellerProfilePageProps {
	params: {
		sellerSlug: string;
	};
} 

const SellerProfilePage = ({params}: SellerProfilePageProps) => {
	const {
		user,
		vendor,
		updateVendor,
		updateSellerProducts,
		updateSellerPagination,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchSeller = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile?slug=${params.sellerSlug}`
			);

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
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile/products?slug=${params.sellerSlug}&page=${currentPage}`
			);

			// console.log('[DATA] ::  ', data);

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
		<Fragment>
			<MainNavbar />
			<main className='bg-[#28312B]'>
				<section className='h-[22vh] md:h-[220px] w-full bg-home flex flex-col items-center justify-center'>
					<h1
						className={`${
							vendor?.isAccountDisabled
								? 'text-base md:text-xl'
								: 'text-base md:text-4xl'
						} font-medium text-white text-center`}
					>
						{vendor?.isAccountDisabled
							? 'Not Found'
							: vendor?.name}
					</h1>
				</section>

				{loading && (
					<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
						<LoadingAnimationOne />
					</div>
				)}

				{!loading && vendor && (
					<div className='flex flex-col w-full bg-white px-4 md:px-8 py-5 space-y-2 sm:space-y-5'>
						<SellerBanner />

						<div className='relative space-y-2'>
							{vendor?.isAccountDisabled === true && (
								<div className='absolute top-0 left-0 h-full w-full bg-[#ffffff90] backdrop-blur-md z-[5] flex flex-col items-center justify-center'>
									<p className='text-center text-sm sm:text-lg font-medium'>
										{vendor?.isAccountDisabled &&
										vendor?.user === user?.id
											? 'Your account has been disabled, subscribe to allow your customers view your products.'
											: 'This account is disabled!'}
									</p>
								</div>
							)}

							<div className='flex items-center justify-between w-full'>
								<SellerInfoSearchForm />
							</div>

							<PageBanner text={`Our Products`} />

							<SellerInfoProducts
								currentPage={currentPage}
								updateCurrentPage={setCurrentPage}
							/>
						</div>
					</div>
				)}
			</main>
			<SellerFooter />
		</Fragment>
	);
};

export default SellerProfilePage;
