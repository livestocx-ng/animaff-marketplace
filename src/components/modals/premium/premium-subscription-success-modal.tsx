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
import Link from 'next/link';
import {useEffect} from 'react';
import {
	useGlobalStore,
	usePremiumSubscriptionSuccessModalStore,
} from '@/hooks/use-global-store';
import {Copy, X} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {Button} from '@/components/ui/button';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const PremiumSubscriptionSuccessModal = () => {

	const {vendorProfile} = useGlobalStore();

	const {onClose} = usePremiumSubscriptionSuccessModalStore();

	useEffect(() => {
		if (vendorProfile) {
			axios.get(`https://animaff.com/store/${vendorProfile?.slug}}`);
		}
	}, [vendorProfile]);

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-20'>
			<div className='bg-white py-6 px-5 w-[90%] md:w-[40%] transition-all duration-700 ease-in-out md:translate-x-3'>
				<div className='flex items-center justify-end px4'>
					<Button
						type='button'
						onClick={() => {
							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='space-y-5 my-2'>
					<p className='text-base'>
						Congratulations, your mini-website/online store has been
						generated successfully. You can share the url with your
						customers and they will access the products from your
						business.
					</p>

					<div className='flex justify-center'>
						<Link
							target='_blank'
							// onClick={() => {
                            //     onClose();
							// }}
                            href={`/store/${vendorProfile?.slug}`}
							className='w-fit bg-green-50 hover:bg-green-50 text-xs h-12 text-green-600 hover:text-green-600 underline rounded py-3 px-8 border-0'
						>
							Visit Store
						</Link>
					</div>

					<div className='flex justify-center space-x-2'>
						<WhatsappShareButton
							title={`Check out my store ${vendorProfile?.name} on Animaff: `}
							url={`https://animaff.com/store/${vendorProfile?.slug}`}
						>
							<WhatsappIcon size={30} round />
						</WhatsappShareButton>
						<FacebookShareButton
							title={`Check out my store ${vendorProfile?.name} on Animaff: `}
							url={`https://animaff.com/store/${vendorProfile?.slug}`}
						>
							<FacebookIcon size={30} round />
						</FacebookShareButton>
						<TwitterShareButton
							title={`Check out my store ${vendorProfile?.name} on Animaff: `}
							url={`https://animaff.com/store/${vendorProfile?.slug}`}
						>
							<TwitterIcon size={30} round />
						</TwitterShareButton>

						<CopyToClipboard
							text={`https://animaff.com/store/${vendorProfile?.slug}`}
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
	);
};

export default PremiumSubscriptionSuccessModal;
