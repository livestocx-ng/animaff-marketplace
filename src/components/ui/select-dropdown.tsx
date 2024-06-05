'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {Dispatch, SetStateAction} from 'react';
import {ScrollArea} from './scroll-area';

interface SelectDropdownProps {
	label?: string;
	classes?: string;
	data: string[];
	setValue: Dispatch<SetStateAction<string>>;
}

const SelectDropdown = ({
	label,
	data,
	classes,
	setValue,
}: SelectDropdownProps) => {
	return (
		<ScrollArea className='h-[200px]'>
			<Select
				onValueChange={(value) => {
					setValue(value);
				}}
			>
				<SelectTrigger className={classes}>
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<div className='max-h-[200px] overflow-y-auto'>
					<SelectContent>
						{data.map((item) => (
							<SelectItem key={item} value='light'>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</div>
			</Select>
		</ScrollArea>
	);
};

export default SelectDropdown;
