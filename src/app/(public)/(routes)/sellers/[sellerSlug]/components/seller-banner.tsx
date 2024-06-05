'use client';
import React from 'react';
import Image from 'next/image';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {MessageCircle, Phone} from 'lucide-react';
import {useGlobalStore} from '@/store/use-global-store';
import {formatVendorSlug} from '@/utils/slug.formatter';

const SellerBanner = () => {
	const router = useRouter();

	const {
		user,
		vendor,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	return (
		<div className='w-[100%] sm:h-[200px] flex flex-col sm:flex-row items-center sm:items-start justify-between'>
			<div className='h-[200px] sm:h-full w-full sm:w-[15%] relative items-center justify-center'>
				<Image
					fill
					unoptimized={true}
					src={vendor?.avatar!}
					alt={formatVendorSlug(vendor!)}
					className='h-full w-full object-cover border border-slate-300 shadow-lg shadow-slate-200 rounded-md'
				/>
			</div>

			<div className='flex flex-col justify-be h-full sm:space-y-3 w-full sm:w-[85%] sm:px-10 mt-2 sm:mt-0'>
				<h1 className='text-sm sm:text-xl font-semibold'>
					{vendor?.name}
					{/* Better Farms Better Farms Better Farms Better
					Farms Better Farms */}
				</h1>
				<p className='text-xs sm:text-sm'>
					{vendor?.state}
					{vendor?.state !== 'Abuja' ? ' State,' : ' ,'} Nigeria
				</p>
				{/* <p>
						Email:{' '}
						<span className='text-orange-500'>{vendor?.email}</span>
					</p>
					<p>
						Contact:{' '}
						<span className='text-orange-500'>
							{vendor?.phoneNumber}
						</span>
					</p> */}
				<div className='hidden sm:flex flex-col sm:flex-row sm:space-x-5'>
					<Button
						type='button'
						variant={'outline'}
						onClick={async () => {
							try {
								if (!user) return router.push('/signin');

								if (user?.id == vendor?.user) {
									return;
								}

								const {data} = await axios.get(
									`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${vendor?.user}`,
									{
										headers: {
											Authorization: user?.accessToken,
										},
									}
								);

								updateChatConversation(data.data);

								router.push('/account');

								updateCurrentAccountTab('Messages');

								updateShowChatConversation(true);
							} catch (_error) {
								const error = _error as AxiosError;
							}
						}}
						className='flex items-center space-x-2 border border-main text-xs rounded-full py-3 w-full sm:w-[150px]'
					>
						<MessageCircle size={18} />
						<p> Chat Seller</p>
					</Button>
					<Button
						type='button'
						variant={'default'}
						onClick={async () => {
							try {
								const link = document.createElement('a');
								link.href = `tel:${vendor?.phoneNumber}`;
								link.target = '_blank';

								link.click();
							} catch (_error) {
								console.log('[CALL-SELLER-ERROR] :: ', _error);
							}
						}}
						className='flex items-center space-x-3 border border-main text-xs rounded-full py-3 w-full sm:w-[150px]'
					>
						<Phone size={18} />
						<p> Call Seller</p>
					</Button>
				</div>
			</div>

			<div className='flex sm:hidden flex-col sm:flex-row sm:space-x-5 w-full'>
				<Button
					type='button'
					variant={'outline'}
					onClick={async () => {
						try {
							if (!user) return router.push('/signin');

							if (user?.id == vendor?.user) {
								return;
							}

							const {data} = await axios.get(
								`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${vendor?.user}`,
								{
									headers: {
										Authorization: user?.accessToken,
									},
								}
							);

							updateChatConversation(data.data);

							router.push('/account');

							updateCurrentAccountTab('Messages');

							updateShowChatConversation(true);
						} catch (_error) {
							const error = _error as AxiosError;
						}
					}}
					className='flex items-center space-x-2 border border-main text-xs rounded-full py-3 w-full sm:w-[150px] my-2'
				>
					<MessageCircle size={18} />
					<p> Chat Seller</p>
				</Button>
				<Button
					type='button'
					variant={'default'}
					onClick={async () => {
						try {
							const link = document.createElement('a');
							link.href = `tel:${vendor?.phoneNumber}`;
							link.target = '_blank';

							link.click();
						} catch (_error) {
							console.log('[CALL-SELLER-ERROR] :: ', _error);
						}
					}}
					className='flex items-center space-x-3 border border-main text-xs rounded-full py-3 w-full sm:w-[150px]'
				>
					<Phone size={18} />
					<p> Call Seller</p>
				</Button>
			</div>
		</div>
	);
};

export default SellerBanner;
