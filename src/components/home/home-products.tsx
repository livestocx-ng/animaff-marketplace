'use client';
import {RotateCw} from 'lucide-react';
import { createGridItems } from '@/utils';
import {usePathname} from 'next/navigation';
import {Button} from '@/components/ui/button';
import ProductCard from '../cards/product-card';
import {useGlobalStore} from '@/hooks/use-global-store';
import TestimonialCard from '../common/testimonial-card';
import {Dispatch, Fragment, SetStateAction, useState} from 'react';

interface Tab {
	id: number;
	title: string;
	value: string;
}

interface HomeProductsProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const TabItems: Tab[] = [
	{
		id: 1,
		title: 'Recommended',
		value: 'recommended',
	},
	{
		id: 2,
		title: 'Popular',
		value: 'popular',
	},
];

const HomeProducts = ({currentPage, updateCurrentPage}: HomeProductsProps) => {
	const pathName = usePathname();
	const {products, totalPages, hasNextPage, testimonials} = useGlobalStore();

	const [currentTab, setCurrentTab] = useState<Tab>(TabItems[0]);

	return (
		<Fragment>
			<div className='flex item-center space-x-4 mt-14 md:mt-10'>
				{pathName.length <= 1 && (
					<>
						{TabItems.map((tab) => (
							<Button
								key={tab.id}
								type='button'
								className={`border bg-white hover:bg-white h-4 py-3 text-xs rounded-md ${
									currentTab.id === tab.id
										? 'border-main text-main'
										: 'border-black text-black'
								}`}
								onClick={() => {
									const index = TabItems.findIndex(
										(item) => item.id === tab.id
									);

									setCurrentTab(TabItems[index]);
								}}
							>
								{tab.title}
							</Button>
						))}
					</>
				)}
			</div>

			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-2'>
				{/* {products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))} */}
				{createGridItems(products, testimonials, 4).map((item, index) =>
					item.type === 'product' ? (
						<ProductCard key={item.id} product={item.product} />
					) : (
						<TestimonialCard
							key={item.id}
							data={item.testimonial}
						/>
					)
				)}
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

export default HomeProducts;
