'use client';
import {Button} from '@/components/ui/button';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export type OrderColumn = {
	id: string;
	orderId: string;
	date: string;
	total: string;
	status: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'orderId',
		header: 'Order ID',
	},
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'total',
		header: 'Total',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => (
			<Link
				href={'#'}
				className='text-main text-sm underline font-medium'
			>
				View Details
			</Link>
		),
	},
];
