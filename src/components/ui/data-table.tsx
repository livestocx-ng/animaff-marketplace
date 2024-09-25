'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {Input} from './input';
import {Button} from './button';
import {useState} from 'react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchKey?: string;
	borderRadius?: string;
	emptyText?: string;
	hasPagination?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
	emptyText,
	borderRadius,
	hasPagination,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<div>
			{searchKey && (
				<div className='flex items-center py-4'>
					<Input
						placeholder='Search...'
						value={
							(table
								.getColumn(searchKey)
								?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table
								.getColumn(searchKey)
								?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
				</div>
			)}

			<div
				className={`${
					borderRadius ? borderRadius : 'rounded-md'
				} border`}
			>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && 'selected'
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									{emptyText ? emptyText : 'No results.'}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{hasPagination !== false && (
				<div className='flex items-center justify-end space-x-2 py-4'>
					<Button
						variant='outline'
						size='sm'
						className="text-xs"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						className="text-xs"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
}
