import {DataTable} from '@/components/ui/data-table';
import React from 'react';
import {OrderColumn, columns} from './tables/orders-column';

const Orders: OrderColumn[] = [
	{
		id: '1',
		orderId: '#123',
		date: '8 Sep, 2023',
		total: '₦13,500 (2 Products)',
		status: 'Processing',
	},
	{
		id: '2',
		orderId: '#259',
		date: '8 Sep, 2023',
		total: '₦17,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '3',
		orderId: '#260',
		date: '8 Oct, 2023',
		total: '₦14,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '4',
		orderId: '#460',
		date: '8 Sep, 2023',
		total: '₦13,500 (2 Products)',
		status: 'Processing',
	},
	{
		id: '5',
		orderId: '#782',
		date: '8 Sep, 2023',
		total: '₦17,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '6',
		orderId: '#030',
		date: '8 Oct, 2023',
		total: '₦14,500 (2 Products)',
		status: 'Delivered',
	},
];

const OrderContent = () => {
	return (
		<div className='w-[78%] flex flex-col gap-5'>
			<div className='w-full rounded-t px-5 py-3 border-t border-l border-r -mb-5 font-semibold text-base'>
				Order History
			</div>

			<DataTable
				columns={columns}
				data={Orders}
				borderRadius='rounded-b'
			/>
		</div>
	);
};

export default OrderContent;
