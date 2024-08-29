'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import {toast} from 'react-hot-toast';
import {Copy, Users, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useReferralModalStore, useGlobalStore} from '@/hooks/use-global-store';

const UserReferralModal = () => {
	const {user} = useGlobalStore();
	const {onClose} = useReferralModalStore();

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-20'>
			<div className='bg-white py-6 px-5 w-[90%] md:w-[40%] lg:w-[35%] rounded-md transition-all duration-700 ease-in-out md:translate-x-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<h1 className='text-sm font-bold'>Referrals </h1>
						<Users size={14} />
					</div>

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

				<div className='space-y-3 my-'>
					<p className='text-sm leading-6'>
						Top referrers get promotions every week!!!🎉🎉🎉 Refer
						your friends and colleagues to use Animaff. Try it
						now!
					</p>

					<div className='flex justify-center'>
						<CopyToClipboard
							text={`Hey, I use Animaff to buy and sell my livestock and pets faster. Use my link or my code "${user?.referralCode}" to join and get easy promotions and sales of your products.\nhttps://animaff.com/signup?referralCode=${user?.referralCode}`}
							onCopy={(text: string, result: boolean) => {
								toast.success(
									'Referral code copied to clipboard',
									{
										duration: 6500,
										className: 'text-sm',
									}
								);
							}}
						>
							<div className='bg-green-500 hover:bg-green-500 h-8 text-xs font-semibold text-white hover:text-white underline rounded-md py-2 px-4 cursor-pointer flex items-center'>
								Copy Code
							</div>
						</CopyToClipboard>
					</div>

					<p className='text-center text-sm font-semibold'>
						Share on:
					</p>

					<div className='flex justify-center space-x-6'>
						<WhatsappShareButton
							title={`Hey, I use Animaff to buy and sell my livestock and pets faster. Use my link or my code "${user?.referralCode}" to join and get easy promotions and sales of your products.`}
							url={`https://animaff.com/signup?referralCode=${user?.referralCode}`}
						>
							<WhatsappIcon size={30} round />
						</WhatsappShareButton>
						<FacebookShareButton
							title={`Hey, I use Animaff to buy and sell my livestock and pets faster. Use my link or my code "${user?.referralCode}" to join and get easy promotions and sales of your products.`}
							url={`https://animaff.com/signup?referralCode=${user?.referralCode}`}
						>
							<FacebookIcon size={30} round />
						</FacebookShareButton>
						<TwitterShareButton
							title={`Hey, I use Animaff to buy and sell my livestock and pets faster. Use my link or my code "${user?.referralCode}" to join and get easy promotions and sales of your products.`}
							url={`https://animaff.com/signup?referralCode=${user?.referralCode}`}
						>
							<TwitterIcon size={30} round />
						</TwitterShareButton>

						<CopyToClipboard
							text={`Hey, I use Animaff to buy and sell my livestock and pets faster. Use my link or my code "${user?.referralCode}" to join and get easy promotions and sales of your products.\nhttps://animaff.com/signup?referralCode=${user?.referralCode}`}
							onCopy={(text: string, result: boolean) => {
								toast.success(
									'Referral link copied to clipboard',
									{
										duration: 6500,
										className: 'text-sm',
									}
								);
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

export default UserReferralModal;
