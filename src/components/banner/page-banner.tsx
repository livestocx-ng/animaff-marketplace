import React from 'react';

const PageBanner = ({text}: {text: string}) => {
	return (
		<div className='w-full relative flex items-center justify-between px-4 py-2 bg-gray-200 rounded'>
			<h1 className='text-sm font-medium'>{text}</h1>
		</div>
	);
};

export default PageBanner;
