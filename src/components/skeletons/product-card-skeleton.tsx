import React from 'react';

const ProductCardSkeleton = () => {
	return (
		<div className='w-[48%] sm:w-[150px] flex flex-col justify-between shadow__1 relative rounded-md'>
			<div className='h-[100px] bg-slate-300 rounded-t-md'></div>

			<div className='flex flex-col justify-between bg-slate-100 border border-t-0 border-slate-200 py-2 relative h-[100px] rounded-b-md transition-all duration-1000 animate-pulse ease-in-out'>
				<div className='space-y-1'>
					<div className='flex justify-between items-center px-2'>
						<div className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-slate-200 rounded-full'></div>

						<div className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-slate-200 rounded-full'></div>

						<div className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-slate-200 rounded-full'></div>
					</div>

					<div className='text-xs sm:text-sm font-semibold px-2'></div>
				</div>
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
