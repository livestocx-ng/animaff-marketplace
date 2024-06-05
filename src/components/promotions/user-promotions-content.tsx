import {Plus} from 'lucide-react';
import {Button} from '../ui/button';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import PromotionCard from '../cards/promotion-card';
import PromotionInfoContent from './promotion-info-content';
import {
	useCreatePromotionModalStore,
	useGlobalStore,
} from '@/hooks/use-global-store';

const UserPromotionsContent = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const {
		user,
		promotions,
		updatePromotions,

		showPromotionInfo,
		updatePromotionsPagination,
	} = useGlobalStore();

	const onCreatePromotionModalOpen = useCreatePromotionModalStore(
		(state) => state.onOpen
	);

	const fetchUserPromotions = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/promotions/fetch-all?page=${currentPage}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePromotionsPagination(
				data.data.totalPages,
				data.data.hasNextPage
			);
			updatePromotions(data.data.promotions);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	useEffect(() => {
		fetchUserPromotions();
	}, []);

	return (
		<div className='w-full flex flex-col'>
			{!showPromotionInfo && (
				<div className='flex items-center justify-between mb-5'>
					<h1 className='text-sm font-medium'>Promotions</h1>

					<Button
						type='button'
						onClick={() => onCreatePromotionModalOpen()}
						className='bg-green-600 flex items-center space-x-2 text-white hover:bg-green-700 w-fit rounded py-2'
					>
						<Plus className='h-4 w-4' /> <p>Add Promotion</p>
					</Button>
				</div>
			)}

			{!showPromotionInfo ? (
				<div className='flex flex-wrap gap-2 md:gap-5 items-center justify-between'>
					{promotions?.map((promotion) => (
						<PromotionCard
							key={promotion.id}
							promotion={promotion}
						/>
					))}
				</div>
			) : (
				<PromotionInfoContent />
			)}
		</div>
	);
};

export default UserPromotionsContent;
