'use client';
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const MarketplaceProductsPage = () => {
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
			Marketplace Products
		</div>
	);
};

export default MarketplaceProductsPage;
