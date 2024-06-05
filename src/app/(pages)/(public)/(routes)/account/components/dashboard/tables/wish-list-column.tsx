'use client';
import Image from 'next/image';
import {XCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ColumnDef} from '@tanstack/react-table';

export type WishListColumn = {
	id: string;
	product: {
		image: string;
		name: string;
	};
	price: string;
	status: string;
};

export const columns: ColumnDef<WishListColumn>[] = [
	{
		accessorKey: 'id',
		header: 'S/N',
	},
	{
		accessorKey: 'product',
		header: 'Product',
		cell: ({row}) => (
			<div className='flex items-center space-x-4'>
				<Image
					width={80}
					height={80}
					unoptimized={true}
					className='rounded-lg'
					alt={row.original.product.name}
					src={row.original.product.image}
				/>

				<p className='text-sm'>{row.original.product.name}</p>
			</div>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'status',
		header: 'Stock Status',
		cell: ({row}) => (
			<p
				className={`px-2 py-1 ${row.original.status === 'Out of Stock'? 'text-red-600 bg-red-100': 'text-main bg-green-100'} rounded w-fit text-center`}
			>
				{row.original.status}
			</p>
		),
	},
	{
		accessorKey: 'id',
		header: ' ',
		cell: ({row}) => (
			<div className='flex items-center space-x-4'>
				<Button className='bg-main hover:bg-main text-white'>
					Add to Cart
				</Button>

				<XCircle className='cursor-pointer text-slate-400 hover:text-slate-600' />
			</div>
		),
	},
];
