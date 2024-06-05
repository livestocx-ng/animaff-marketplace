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
import {Plus} from 'lucide-react';
import {FilterOptions} from '@/data';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface CategoryDropDownButtonProps {
	value: string;
	classes?: string;
	setValue: Dispatch<SetStateAction<string>>;
	setShowStatusBar: Dispatch<SetStateAction<Checked>>;
}

export function CategoryDropDownButton({
	classes,
	value,
	setValue,
	setShowStatusBar,
}: CategoryDropDownButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className={`w-fit flex items-center space-x-3 ${classes}`}
				>
					<Plus className='h-4 w-4 text-white' />{' '}
					<p className='text-xs'>
						{value ? value.toUpperCase() : 'Category'}
					</p>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				{FilterOptions.map((option) => (
					<DropdownMenuCheckboxItem
						key={option.value}
						onCheckedChange={(checked: Checked) => {
							setValue(option.value.toUpperCase());

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
