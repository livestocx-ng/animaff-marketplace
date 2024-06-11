'use client';
import {
	useGlobalStore,
	useCreateProductModalStore,
} from '@/hooks/use-global-store';
import {useEffect} from 'react';
import {Plus} from 'lucide-react';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {columns} from './tables/products-column';
import {DataTable} from '@/components/ui/data-table';

const ProductsContent = () => {
	const isModalOpen = useCreateProductModalStore((state) => state.isOpen);
	const onModalOpen = useCreateProductModalStore((state) => state.onOpen);

	const {user, products, updateProducts} = useGlobalStore();

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
			<div className='flex justify-end'>
				<Button
					type='button'
					onClick={() => {
						if (!isModalOpen) {
							onModalOpen();
						}
					}}
					className='bg-green-600 flex items-center space-x-3 text-white h-10 hover:bg-green-700 w-fit rounded py-2'
				>
					<Plus className='h-4 w-4' /> <p>Post Product</p>
				</Button>
			</div>

			<DataTable
				data={products}
				// data={Products}
				columns={columns}
				borderRadius='rounded-b'
			/>
		</div>
	);
};

export default ProductsContent;
