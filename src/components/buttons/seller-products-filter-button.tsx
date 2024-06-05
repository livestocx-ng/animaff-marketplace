'use client';
import {Dispatch, FormEventHandler, SetStateAction, useState} from 'react';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';

import {Button} from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {ChevronDown} from 'lucide-react';
import {FilterOptions, SellerFilterOptions, SellerFilterOptionsValue} from '@/data';

type Checked = DropdownMenuCheckboxItemProps['checked'];

type FormData = {
	recommended: boolean;
	newest: boolean;
	oldest: boolean;
	lowestPrice: boolean;
	highestPrice: boolean;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

interface SellerProductsFilterButtonProps {
	value: string;
	classes?: string;
	// updateValue: (value: FormAction) => void;
	updateValue: (value: SellerFilterOptionsValue) => void;
	setShowStatusBar: Dispatch<SetStateAction<Checked>>;
}

export function SellerProductsFilterButton({
	classes,
	value,
	updateValue,
	setShowStatusBar,
}: SellerProductsFilterButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className={`w-fit flex items-center space-x-3 ${classes}`}
				>
					<ChevronDown className='h-4 w-4 text-white' />{' '}
					{value === '' && <p className='text-xs'>Value</p>}
					{value !== '' && (
						<p className='text-xs capitalize'>{value}</p>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				{SellerFilterOptions.map((option) => (
					<DropdownMenuCheckboxItem
						key={option.value}
						onCheckedChange={(checked: Checked) => {
							// updateValue({
							// 	type: 'UPDATE_FORMDATA',
							// 	payload: {
							// 		[option.value]: true,
							// 	},
							// });
							updateValue(option.value);

							setShowStatusBar(checked);
						}}
						// checked={showStatusBar}
						checked={value === option.value ? true : false}
					>
						{option.title}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
