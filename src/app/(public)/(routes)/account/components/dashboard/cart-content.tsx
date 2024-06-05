import {DataTable} from '@/components/ui/data-table';
import {CartColumn, columns} from './tables/cart-column';

const CartItems: CartColumn[] = [
	{
		id: '1',
		product: {
			name: 'Broilers',
			image: '/product__2.png',
		},
		price: '$14.99',
		status: 'In Stock',
	},
	{
		id: '2',
		product: {
			name: 'Pig',
			image: '/product__3.png',
		},
		price: '$14.99',
		status: 'In Stock',
	},
	{
		id: '3',
		product: {
			name: 'Cattle',
			image: '/product__1.jpg',
		},
		price: '$14.99',
		status: 'Out of Stock',
	},
];

const CartContent = () => {
	return (
		<div className='w-[78%] flex flex-col gap-5'>
			<DataTable columns={columns} data={CartItems} borderRadius='rounded' />
		</div>
	);
};

export default CartContent;
