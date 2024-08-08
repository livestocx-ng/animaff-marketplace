'use client';
import Lottie from 'lottie-react';
import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Dispatch, SetStateAction} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';
import SellerProductCard from '@/components/cards/seller-product-card';
import ProductCardSkeleton from '@/components/skeletons/product-card-skeleton';
import EmptyAnimation from '../../../../../../../../public/animations/animation__3.json';

interface SellerInfoProductsProps {
	currentPage: number;
	isSellerProductsLoading: boolean;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const SellerInfoProducts = ({
	currentPage,
	updateCurrentPage,
	isSellerProductsLoading,
}: SellerInfoProductsProps) => {
	const {sellerProducts, sellerTotalPages, sellerHasNextPage} =
		useGlobalStore();

	// console.log(sellerHasNextPage);

	return (
		<div className='flex flex-col w-full bg-white '>
			{isSellerProductsLoading && sellerProducts?.length === 0 && (
				<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 sm:pt-0 mt-4'>
					{Array(16)
						.fill(1)
						.map((item, index) => (
							<ProductCardSkeleton key={index} />
						))}
				</div>
			)}

			{!isSellerProductsLoading && sellerProducts?.length === 0 && (
				<div className='w-full bg-white h-[60vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={false}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{sellerProducts?.length > 0 && (
				<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2'>
					{sellerProducts?.map((product) => (
						<SellerProductCard key={product.id} product={product} />
					))}
				</div>
			)}

			{!sellerHasNextPage && sellerTotalPages > 1 && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updateCurrentPage(1);
							window.scrollTo({
								top: 50,
								behavior: 'smooth',
							});
						}}
						className='flex items-center space-x-1 bg-white border hover:bg:white focus:bg-white'
					>
						<RotateCw />
						<span>Reset</span>
					</Button>
				</div>
			)}
			{sellerHasNextPage === true && (
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
		</div>
	);
};

export default SellerInfoProducts;
