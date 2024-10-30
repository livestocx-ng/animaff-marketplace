'use client';
import React, {Suspense, useEffect} from 'react';
import {redirect, useRouter} from 'next/navigation';

const StoresPageContent = () => {
	const router = useRouter();

	const initializeRedirect = () => {
		setTimeout(() => {
			return redirect('/');
		}, 800);
	};

	useEffect(() => {
		initializeRedirect();
	}, [router]);

	return (
		<div className='h-screen flex flex-col items-center justify-center'>
			Stores Page
		</div>
	);
};

const LoadingState = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			{/* <ButtonLoader /> */}
		</div>
	);
};

// Main page component that provides Suspense boundary
const StoresPage = () => {
	return (
		<html>
			<body>
				<Suspense fallback={<LoadingState />}>
					<StoresPageContent />
				</Suspense>
			</body>
		</html>
	);
};

export default StoresPage;
