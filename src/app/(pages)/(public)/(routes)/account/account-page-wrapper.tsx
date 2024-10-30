'use client';
import dynamic from 'next/dynamic';
import {Suspense} from 'react';

const AccountPageClient = dynamic(() => import('./account-page-client'), {
	ssr: false,
});

const LoadingState = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			{/* <ButtonLoader /> */}
		</div>
	);
};

export default function AccountPageWrapper() {
	return (
		<Suspense fallback={<LoadingState />}>
			<AccountPageClient />
		</Suspense>
	);
}
