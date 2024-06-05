'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import React, {useEffect, useState} from 'react';
import SearchForm from '../components/search-form';
import HomeSellers from './components/home-sellers';
import {useGlobalStore} from '@/store/use-global-store';
import EmptyAnimation from '../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../public/animations/loading__animation__1.json';

const SellersPage = () => {
	const userStore = useUserHook();

	const {vendors, updateVendors, updatePagination} = useGlobalStore();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchSellers = async () => {
		try {
			if (vendors?.length !== 0 && currentPage === 1) {
				return;
			}

			if (currentPage === 1) {
				setLoading(true);
			}

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/fetch-all?page=${currentPage}`
			);

			updateVendors(data.data.vendors);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchSellers();
	}, [currentPage]);

	return (
		<main className='bg-[#28312B]'>
			<section className='h-[28vh] md:h-[320px] w-full bg-home flex flex-col items-center justify-end gap-y-3 md:gap-y-10 py-2 md:py-10 md:pb-2'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Sellers
				</h1>

				<SearchForm />
			</section>

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

			{!loading && vendors?.length === 0 && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && vendors?.length > 0 && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 py-10'>
					<HomeSellers
						currentPage={currentPage}
						updateCurrentPage={setCurrentPage}
					/>
				</div>
			)}
		</main>
	);
};

export default SellersPage;
