import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Dispatch, SetStateAction} from 'react';
import ProductCard from '@/components/cards/product-card';
import {useGlobalStore} from '@/hooks/use-global-store';

interface MarketplaceProductsProps {
	//products: Product[];
	// id: number;
	// title: string;
	// value: string;
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const MarketplaceProducts = ({
	currentPage,
	updateCurrentPage,
}: MarketplaceProductsProps) => {
	const {products, totalPages, hasNextPage} = useGlobalStore();

	return (
		<div className='flex flex-col w-full bg-white'>
			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2'>
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{!hasNextPage && totalPages > 1 && (
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
						className='flex items-center space-x-1 bg-white border hover:bg:white focus:bg-white'
					>
						<RotateCw />
						<span>Load More</span>
					</Button>
				</div>
			)}
		</div>
	);
};

export default MarketplaceProducts;
