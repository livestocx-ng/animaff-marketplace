'use client';
import React, {Dispatch, Fragment, SetStateAction} from 'react';
import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import SellerInfoCard from './seller-info-card';
import {useGlobalStore} from '@/store/use-global-store';

interface HomeSellerProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const HomeSellers = ({currentPage, updateCurrentPage}: HomeSellerProps) => {
	const {hasNextPage, totalPages, vendors} = useGlobalStore();

	return (
		<Fragment>
			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2'>
				{vendors?.map((vendor) => (
					<SellerInfoCard key={vendor.id} vendor={vendor} />
				))}
			</div>

			{!hasNextPage && totalPages > 1 && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updateCurrentPage(1);
						}}
						className='flex items-center space-x-1 bg-white border hover:bg:white focus:bg-white'
					>
						<RotateCw />
						<span>Reset</span>
					</Button>
				</div>
			)}

			{hasNextPage && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updateCurrentPage(currentPage + 1);

							window.scrollTo({
								top: 50,
								behavior: 'smooth',
							});
						}}
						className='flex items-center space-x-1 bg-white border border-slate-600 hover:bg:white focus:bg-white text-[10px] h-8'
					>
						<RotateCw size={12} />
						<span>Load More</span>
					</Button>
				</div>
			)}
		</Fragment>
	);
};

export default HomeSellers;
