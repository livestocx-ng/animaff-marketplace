'use client';
import {ColumnDef} from '@tanstack/react-table';
import {EnterprisePlanComparison} from '@/types/types';
import {Check, X} from 'lucide-react';

export const EnterprisePlansComparisonsColumns: ColumnDef<EnterprisePlanComparison>[] =
	[
		{
			accessorKey: 'id',
			header: '',
			cell: ({row}) => <p className='text-xs'>{row.index + 1}</p>,
		},
		{
			accessorKey: 'feature',
			header: 'Feature',
			cell: ({row}) => {
				return (
					<div className='flex items-center space-x-4 cursor-pointer'>
						<p className='text-sm font-medium'>
							{row.original.feature}
						</p>
					</div>
				);
			},
		},
		{
			accessorKey: 'customBusinessWebsite',
			header: 'Custom Business Website',
			cell: ({row}) => {
				return (
					<div className='cursor-pointer flex items-center space-x-3'>
						<span>
							<X size={14} className='text-red-400'/>
						</span>{' '}
						<p> {row.original.customBusinessWebsite}</p>
					</div>
				);
			},
		},
		{
			accessorKey: 'platform',
			header: 'Animaff Platform',
			cell: ({row}) => {
				return (
					<div className='cursor-pointer flex items-center space-x-3'>
						<span>
							<Check size={16} className='text-green-600' />
						</span>{' '}
						<p>{row.original.platform}</p>
					</div>
				);
			},
		},
	];
