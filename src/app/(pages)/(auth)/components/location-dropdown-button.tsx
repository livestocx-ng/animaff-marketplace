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
import {ChevronDown, Plus} from 'lucide-react';
import {RegionStates} from '@/data';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface LocationDropDownButtonProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	setShowStatusBar: Dispatch<SetStateAction<Checked>>;
}

export function LocationDropDownButton({
	value,
	setValue,
	setShowStatusBar,
}: LocationDropDownButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className='w-full flex items-center justify-between bg-white rounded hover:bg-white text-black hover:text-black'
				>
					<p className='text-xs'>Location</p>
					<ChevronDown className='h-4 w-4 text-black' />{' '}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				{RegionStates.map((country) => (
					<DropdownMenuCheckboxItem
						key={country}
						onCheckedChange={(checked: Checked) => {
							setValue(country);

							setShowStatusBar(checked);
						}}
						// checked={showStatusBar}
						checked={value === country ? true : false}
					>
						{country}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
