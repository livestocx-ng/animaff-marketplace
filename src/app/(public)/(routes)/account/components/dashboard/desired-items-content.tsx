'use client';
import Image from 'next/image';
import {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {useGlobalStore} from '@/store/use-global-store';
import DesiredItemCard from '@/components/cards/desired-item-card';

const DesiredItemsContent = () => {
	const {user, desiredProducts, updateDesiredProducts, updatePagination} =
		useGlobalStore();

	const fetchDesiredProducts = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/fetch-desired-products`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data.data);
			// // console.log('[DATA] ::  ', data);

			updateDesiredProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCT-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchDesiredProducts();
	}, []);

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			{desiredProducts?.length === 0 && (
				<div className='flex flex-col items-center justify-center py-20'>
					<Image
						alt='logo'
						width={150}
						height={150}
						unoptimized={true}
						src={'/logo.svg'}
						className='opacity-50'
					/>
				</div>
			)}
			<div className='flex flex-col w-full space-y-5'>
				{desiredProducts?.length > 0 &&
					desiredProducts?.map((item) => (
						<DesiredItemCard key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default DesiredItemsContent;
