import React from 'react';
import {Collapse} from 'react-collapse';
import {Minus, Plus} from 'lucide-react';
import {FaqOption} from '@/types/index.types';

const FaqAccordionCard = ({
	data,
	open,
	toggle,
}: {
	data: FaqOption;
	open: boolean;
	toggle: () => void;
}) => {
	return (
		<div className='w-full pt-[10px]'>
			<div
				onClick={toggle}
				className='border border-orange-500 bg-white py-5 px-5 md:px-10 flex justify-between items-center cursor-pointer'
			>
				<p className='font-semibold text-sm md:text-base'>{data.title}</p>
				<div className='text xl'>{open ? <Minus className='text-red-500' /> : <Plus className='text-main' />}</div>
			</div>

			<Collapse isOpened={open} className='py-10'>
				{data?.first_description && (
					<ul className='list-disc space-y-5 px-5 md:px-10 text-sm md:text-base'>
						<li className=' pt-10'>{data?.first_description}</li>
						<li className=''>{data?.second_description}</li>
					</ul>
				)}
				<div className=' pb-10 pt-10 px-5 md:px-10 text-sm md:text-base'>{data.description}</div>
			</Collapse>
		</div>
	);
};

export default FaqAccordionCard;
