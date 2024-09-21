'use client';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useCreateProductModalStore,
	useProductUploadSubscriptionModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Plus, ZapIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {columns} from './tables/products-column';
import {DataTable} from '@/components/ui/data-table';

const ProductsContent = () => {
	const isModalOpen = useCreateProductModalStore((state) => state.isOpen);
	const onModalOpen = useCreateProductModalStore((state) => state.onOpen);

	const modal = useProductUploadSubscriptionModalStore();
	const {user, userProductUploadSubscription, products, updateProducts} =
		useGlobalStore();

	const fetchProducts = async () => {
		try {
			// console.log('[USER] ::  ', user);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/products/fetch-all`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data);

			updateProducts(data.data.products);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5 '>
			<div className='flex justify-end space-x-5'>
				{userProductUploadSubscription === null && (
						<Button
							type='button'
							onClick={() => {
								modal.onOpen();
							}}
							className='bg-sky-600 flex items-center space-x-3 text-white h-10 hover:bg-sky-700 w-fit rounded py-2'
						>
							<ZapIcon className='h-4 w-4' />{' '}
							<p className='text-xs md:text-xs'>Renew subscription</p>
						</Button>
					)}

				<Button
					type='button'
					onClick={() => {
						if (
							userProductUploadSubscription === null ||
							user?.productUploadLimit === 0
						) {
							return toast.error(
								'Product upload subscription expired!',
								{className: 'text-xs sm:text-base'}
							);
						}

						if (!isModalOpen) {
							onModalOpen();
						}
					}}
					className='bg-green-600 flex items-center space-x-3 text-white h-10 hover:bg-green-700 w-fit rounded py-2'
				>
					<Plus className='h-4 w-4' />{' '}
					<p className='text-xs md:text-xs'>Post Product</p>
				</Button>
			</div>

			<DataTable
				data={products}
				columns={columns}
				borderRadius='rounded-b'
			/>
		</div>
	);
};

export default ProductsContent;
