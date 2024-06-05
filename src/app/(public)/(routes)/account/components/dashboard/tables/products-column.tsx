'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import Image from 'next/image';
import {
	useGlobalStore,
	useUpdateProductModalStore,
} from '@/store/use-global-store';
import {Copy} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {Product} from '@/types/types';
import {ColumnDef} from '@tanstack/react-table';
import {PriceFormatter} from '@/utils/price.formatter';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {formatProductSlug} from '@/utils/slug.formatter';

export interface ProductColumn extends Product {}

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => <p className='text-xs'>{row.index + 1}</p>,
	},
	{
		accessorKey: 'name',
		header: 'Product',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			fetch(
				`https://livestocx.com/marketplace/products/${formatProductSlug(
					row.original
				)}`
			);

			return (
				<div
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='flex items-center space-x-4 cursor-pointer'
				>
					<div className='h-[70px] w-[70px] relative'>
						<Image
							fill
							// width={40}
							// height={40}
							unoptimized={true}
							className='w-full h-full object-fill'
							alt={row.original.name}
							src={
								row.original.media?.find(
									(media) =>
										media.mediaUrl.includes('.jpeg') ||
										media.mediaUrl.endsWith('.jpg') ||
										media.mediaUrl.endsWith('.png')
								)?.mediaUrl!
									? row.original.media?.find(
											(media) =>
												media.mediaUrl.includes(
													'.jpeg'
												) ||
												media.mediaUrl.endsWith(
													'.jpg'
												) ||
												media.mediaUrl.endsWith('.png')
									  )?.mediaUrl!
									: '/product__4.jpg'
							}
						/>
					</div>
					<p className='text-sm'>{row.original.name}</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{PriceFormatter(row.original.price)}
				</p>
			);
		},
	},
	{
		accessorKey: 'discountPrice',
		header: 'Discount Price',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{PriceFormatter(row.original.discountPrice)}
				</p>
			);
		},
	},
	{
		accessorKey: 'inStock',
		header: 'In Stock',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{row.original.inStock === true ? 'True' : 'False'}
				</p>
			);
		},
	},
	{
		accessorKey: 'isNegotiable',
		header: 'Negotiable',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{row.original.isNegotiable === true ? 'True' : 'False'}
				</p>
			);
		},
	},
	{
		accessorKey: 'id',
		header: 'Share',
		cell: ({row}) => (
			<div className='flex space-x-2'>
				<WhatsappShareButton
					url={`https://livestocx.com/marketplace/products/${formatProductSlug(
						row.original
					)}`}
					title={`Check out my ${row.original.name} on livestocx: `}
				>
					<WhatsappIcon size={25} round />
				</WhatsappShareButton>
				<FacebookShareButton
					url={`https://livestocx.com/marketplace/products/${formatProductSlug(
						row.original
					)}`}
					title={`Check out my ${row.original.name} on livestocx: `}
				>
					<FacebookIcon size={25} round />
				</FacebookShareButton>
				<TwitterShareButton
					url={`https://livestocx.com/marketplace/products/${formatProductSlug(
						row.original
					)}`}
					title={`Check out my ${row.original.name} on livestocx: `}
				>
					<TwitterIcon size={25} round />
				</TwitterShareButton>

				<CopyToClipboard
					onCopy={(text: string, result: boolean) => {
						toast.success('Copied to clipboard');
					}}
					text={`https://livestocx.com/marketplace/products/${formatProductSlug(
						row.original
					)}`}
				>
					<div className='rounded-full border border-slate-400 h-7 w-7 flex items-center justify-center cursor-pointer'>
						<Copy className='h-4 w-4' />
					</div>
				</CopyToClipboard>
			</div>
		),
	},
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => {
			const {updatePayload, onOpen} = useUpdateProductModalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						onOpen();
					}}
					className='text-main text-sm underline font-medium cursor-pointer'
				>
					Update
				</p>
			);
		},
	},
];
