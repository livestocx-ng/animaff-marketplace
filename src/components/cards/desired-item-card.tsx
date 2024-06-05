import React from 'react';
import Image from 'next/image';
import {Button} from '../ui/button';
import {DesiredItem} from '@/types/types';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/store/use-global-store';

const DesiredItemCard = ({item}: {item: DesiredItem}) => {
	const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

	return (
		<div className='w-full border rounded-lg flex items-center justify-between'>
			<div className='relative w-[15%] h-[120px] rounded-l'>
				<Image
					alt=''
					fill
					unoptimized={true}
					className='object-full rounded-l'
					src={item.product.media[0].mediaUrl}
				/>
			</div>

			<div className='flex flex-col space-y-5 w-[80%] pr-4'>
				<div className='flex items-center justify-between'>
					<h1 className='font-semibold'>{item.product.name}</h1>
					<h1 className='text-main font-medium text-sm'>
						{PriceFormatter(item.product.discountPrice)} -{' '}
						{PriceFormatter(item.product.price)}
					</h1>
				</div>

				<div className='flex flex-wrap items-center justify-between'>
					<Button
						type='button'
						disabled
						variant={'outline'}
						className='opacity-0 border-white text-white text-[10px] md:text-xs h-10 w-fit rounded-sm py-2'
					>
						Contact
					</Button>
					<Button
						type='button'
						variant={'outline'}
						className='bg-main text-white hover:bg-main hover:text-white text-[10px] md:text-xs h-10 w-fit rounded-sm py-2'
					>
						Chat Seller
					</Button>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updatePayload(item.product);
							updateCurrentAccountTab('Desired Item');
						}}
						className='bg-orange-500 text-white hover:bg-orange-500 hover:text-white text-[10px] md:text-xs h-10 w-fit rounded-sm py-2'
					>
						View
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DesiredItemCard;
