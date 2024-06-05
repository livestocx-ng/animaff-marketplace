'use client';
import {FilterOptions} from '@/data';
import {useRouter} from 'next/navigation';

const MarketplaceFilterForm = () => {
	const router = useRouter();

	return (
		<div className='pt- px-'>
			<div className='w-full relative flex items-center justify-between px-4 py-2 bg-gra-300 rounded'>
				<h1></h1>

				<div>
					<select
						name='location'
						className='w-full border py-1 rounded px-3 text-sm scrollbar__1'
						onChange={(
							event: React.ChangeEvent<HTMLSelectElement>
						) => {
							return router.push(
								`/marketplace/${event.target.value.toLowerCase()}`
							);
						}}
					>
						<option value=''>Filter</option>
						{FilterOptions.map((option) => (
							<option
								key={option.id}
								value={option.value}
								className='cursor-pointer text-sm'
							>
								{option.title}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default MarketplaceFilterForm;
