'use client';
import Link from 'next/link';
import {RotateCw} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';
import {Dispatch, Fragment, SetStateAction} from 'react';
import ProductCard from '@/components/cards/product-card';

interface HomeProductsProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const SearchProducts = ({
	currentPage,
	updateCurrentPage,
}: HomeProductsProps) => {
    const pathname = window.location.pathname;
	const searchParams = window.location.search;

	const {user, searchProducts, searchTotalPages, searchHasNextPage} =
		useGlobalStore();

	return (
		<div className='relative mt-4 sm:mt-0'>
			{!user && (
				<div className='absolute top-0 left-0 h-full w-full bg-[#ffffff90] backdrop-blur-md z-[5] flex flex-col items-center justify-cente pt-40'>
					<Link
						href={`/signin?redirect_to=${pathname.slice(1).concat(
							searchParams
						)}`}
						className='text-center text-sm font-medium cursor-pointer underline'
					>
						Login to see search results
					</Link>
				</div>
			)}
			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-2'>
				{searchProducts?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{!searchHasNextPage && searchTotalPages > 1 && (
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
						className='flex items-center space-x-1 bg-white border border-slate-600 hover:bg:white focus:bg-white text-[10px] h-8'
					>
						<RotateCw size={12} />
						<span>Reset</span>
					</Button>
				</div>
			)}
			{searchHasNextPage && (
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

export default SearchProducts;
