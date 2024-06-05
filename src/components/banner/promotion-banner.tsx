import React from 'react';
import {LineChart} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useGlobalStore} from '@/store/use-global-store';

const PromotionBanner = () => {
	const router = useRouter();

	const {user, updateCurrentAccountTab} = useGlobalStore();

	return (
		<div
			onClick={async () => {
				try {
					if (user == null) {
						return router.push('/signin');
					}

					router.push('/account');

					updateCurrentAccountTab('Promotions');
				} catch (error) {
					// console.log(_error);
				}
			}}
			className='absolute top-0 left-0 w-full py-2 bg-gradient-to-tr from-indigo-200 to-indigo-500 text-sm px-4 flex items-center justify-center space-x-3 cursor-pointer'
		>
			<p className='text-xs md:text-sm font-medium'>
				Want to sell very fast? Boost your product with just &#8358;810
				per week
			</p>

			<LineChart size={18} />
		</div>
	);
};

export default PromotionBanner;
