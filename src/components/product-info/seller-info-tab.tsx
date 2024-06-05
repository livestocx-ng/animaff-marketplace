import {useGlobalStore} from '@/store/use-global-store';

const SellerInfoTab = () => {
	const {productInfo} = useGlobalStore();

	return (
		<div className='flex flex-col space-y-5 py-10 px-8'>
			{/* <h1 className='font-semibold text-xl'>Vendor Information</h1> */}

			<ul className='text-sm'>
				<li>
					<span className='font-semibold'>Store Name:</span>{' '}
					{productInfo?.name!}
				</li>

				<li>
					<span className='font-semibold'>Address:</span>{' '}
					{productInfo?.address}
				</li>
			</ul>

			{/* <p className='text-base'>No ratings found yet!</p> */}
		</div>
	);
};

export default SellerInfoTab;
