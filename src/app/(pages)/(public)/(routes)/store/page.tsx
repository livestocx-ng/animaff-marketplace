'use client';
import React, {Suspense, useEffect} from 'react';
import {useRouter} from 'next/navigation';

const StoresPageContent = () => {
	const router = useRouter();

	const initializeRedirect = () => {
		setTimeout(() => {
			return router.replace('/');
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
	  <div className="w-full h-screen flex items-center justify-center">
		{/* <ButtonLoader /> */}
	  </div>
	);
  };
  
  // Main page component that provides Suspense boundary
  const StoresPage = () => {
	  return (
		  <Suspense fallback={<LoadingState />}>
			  <StoresPageContent />
		  </Suspense>
	  );
  };

export default StoresPage;
