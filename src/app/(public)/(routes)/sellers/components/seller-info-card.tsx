'use-client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Vendor} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/store/use-global-store';
import {formatVendorSlug} from '@/utils/slug.formatter';

const SellerInfoCard = ({vendor}: {vendor: Vendor}) => {
	const router = useRouter();

	const {
		user,
		updateVendor,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	return (
		<div className='w-full sm:w-[240px] border border-slate-400 flex flex-col justify-between relative cursor-pointe shadow-md shadow-slate-300 rounded-lg px-4 py-2'>
			<div className='border-b border-b-main flex flex-col space-y-1 pb-2'>
				<div className='flex justify-end'>
					<Image
						alt='logo'
						width={20}
						height={20}
						unoptimized={true}
						src={'/mobile-logo.jpeg'}
						className='rounded-full animate-pulse'
					/>
				</div>

				<h1 className='text-xs uppercase font-medium'>
					{vendor?.name.length > 22
						? `${vendor?.name.slice(0, 22)}...`
						: vendor?.name}
				</h1>
				<p className='text-xs'>
					{vendor.state} {vendor?.state !== 'Abuja' ? 'State.' : ''}
				</p>
			</div>

			<div className='flex flex-wrap items-center justify-between py-2 w-full'>
				<div className='h-[60px] w-[60px] rounded-full border border-slate-500 relative'>
					<Image
						fill
						unoptimized={true}
						src={vendor?.avatar}
						alt={formatVendorSlug(vendor!)}
						className='object-cover h-full w-full absolute rounded-full shadow-md shadow-slate-500'
					/>
				</div>

				<div className='w-full flex flex-row-reverse sm:flex-col justify-between sm:justify-normal sm:space-x-0 sm:space-y-2 mt-2'>
					<Link href={`/sellers/${formatVendorSlug(vendor)}`}>
						<Button
							type='button'
							variant={'default'}
							onClick={() => {
								updateVendor(vendor);
							}}
							className=' text-white hover:text-white text-xs h-10 py-3 w-[130px] sm:w-full rounded-full'
						>
							Profile
						</Button>
					</Link>

					<Link href={'#'}>
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
												Authorization:
													user?.accessToken,
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
							className='border border-main text-main text-xs h-10 py-3 w-[130px] sm:w-full rounded-full'
						>
							Chat Seller
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SellerInfoCard;
