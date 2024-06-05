'use client';
import Lottie from 'lottie-react';
import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Dispatch, SetStateAction} from 'react';
import {useGlobalStore} from '@/store/use-global-store';
import ProductCard from '@/components/cards/product-card';
import EmptyAnimation from '../../../../../../../../public/animations/animation__3.json';

interface SellerInfoProductsProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const SellerInfoProducts = ({
	currentPage,
	updateCurrentPage,
}: SellerInfoProductsProps) => {
	const {sellerProducts, sellerTotalPages, sellerHasNextPage} =
		useGlobalStore();

	// console.log(sellerHasNextPage);

	return (
		<div className='flex flex-col w-full bg-white '>
			{sellerProducts?.length === 0 && (
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

			{sellerProducts?.length > 0 && (
				<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2'>
					{sellerProducts?.map((product) => (
						<ProductCard key={product.id} product={product} />
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
