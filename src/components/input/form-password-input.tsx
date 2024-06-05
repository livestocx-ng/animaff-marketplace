import {cn} from '@/lib/utils';
import React, {useState} from 'react';
import {Eye, EyeOff} from 'lucide-react';

interface FormPasswordInputProps {
	disabled?: boolean;
	classes?: string;
	name: string;
	value: string;
	showIcon?: boolean;
	padding?: string;
	placeHolder: string;
	type?: 'text' | 'password';
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormPasswordInput = ({
	classes,
	name,
	value,
	padding,
	disabled,
	handleChange,
	placeHolder,
	showIcon = true,
}: FormPasswordInputProps) => {
	const [hidePassword, setHidePassword] = useState<boolean>(true);

	return (
		<div className='relative'>
			<input
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeHolder}
				disabled={disabled ? disabled : false}
				type={hidePassword ? 'password' : 'text'}
				className={cn(
					'placeholder:text-[12px] text-[12px] rounded w-full hover:outline-none focus:outline-none focus:border-gray-600',
					classes,
					padding ? padding : 'px-5 py-4'
				)}
			/>

			{!hidePassword && showIcon && (
				<EyeOff
					size={18}
					className={`absolute right-6 top-4 cursor-pointer ${
						hidePassword ? 'text-gray-600' : 'text-gray-400'
					}`}
					onClick={() => setHidePassword(!hidePassword)}
				/>
			)}

			{hidePassword && showIcon && (
				<Eye
					size={18}
					className={`absolute right-6 top-4 cursor-pointer ${
						hidePassword ? 'text-gray-600' : 'text-gray-400'
					}`}
					onClick={() => setHidePassword(!hidePassword)}
				/>
			)}
		</div>
	);
};

export default FormPasswordInput;
