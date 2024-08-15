'use client';
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const MarketplacePage = () => {
	const router = useRouter();

	const initializeRedirect = () => {
		setTimeout(() => {
			return router.replace('/');
		}, 800);
	};

	useEffect(() => {
		initializeRedirect();
	}, []);

	return (
		<div className='h-screen flex flex-col items-center justify-center'>
			Marketplace
		</div>
	);
};

export default MarketplacePage;
