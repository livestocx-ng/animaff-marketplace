'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import axios from 'axios';
import Image from 'next/image';
import {useEffect} from 'react';
import {Copy, X} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {Button} from '@/components/ui/button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {formatProductSlug} from '@/utils/slug.formatter';
import {useShareProductModalStore} from '@/hooks/use-global-store';

const ShareProductModal = () => {
	const {payload, onClose} = useShareProductModalStore();

	useEffect(() => {
		axios.get(
			`https://livestocx.com/marketplace/products/${formatProductSlug(
				payload!
			)}`
		);
	}, []);

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<div className='flex flex-col w-[90%] md:w-[30%] bg-white py-2 px-4  overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='text- font-medium'>Share Product</h1>

					<Button
						type='button'
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col items-center w-full py-4 space-y-4'>
					<div className='h-[200px] w-full relative'>
						<Image
							fill
							unoptimized={true}
							alt='product'
							src={
								payload?.media?.find(
									(media) =>
										media.mediaUrl.includes('.jpeg') ||
										media.mediaUrl.endsWith('.jpg') ||
										media.mediaUrl.endsWith('.png')
								)?.mediaUrl!
							}
							className='object-cover absolute'
						/>
					</div>

					<div className='flex items-center'>
						<h1 className='text-sm font-medium'>
							Share On: &nbsp;
						</h1>
						<div className='flex space-x-2'>
							<WhatsappShareButton
								title={`Check out my ${payload.name} on livestocx: `}
								url={`https://livestocx.com/marketplace/products/${formatProductSlug(
									payload!
								)}`}
							>
								<WhatsappIcon size={30} round />
							</WhatsappShareButton>
							<FacebookShareButton
								title={`Check out my ${payload.name} on livestocx: `}
								url={`https://livestocx.com/marketplace/products/${formatProductSlug(
									payload!
								)}`}
							>
								<FacebookIcon size={30} round />
							</FacebookShareButton>
							<TwitterShareButton
								title={`Check out my ${payload.name} on livestocx: `}
								url={`https://livestocx.com/marketplace/products/${formatProductSlug(
									payload!
								)}`}
							>
								<TwitterIcon size={30} round />
							</TwitterShareButton>

							<CopyToClipboard
								text={`https://livestocx.com/marketplace/products/${formatProductSlug(
									payload!
								)}`}
								onCopy={(text: string, result: boolean) => {
									toast.success('Copied to clipboard');
								}}
							>
								<div className='rounded-full border border-slate-400 h-8 w-8 flex items-center justify-center cursor-pointer'>
									<Copy className='h-4 w-4' />
								</div>
							</CopyToClipboard>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareProductModal;
