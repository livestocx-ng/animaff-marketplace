'use client';
import {useEffect} from 'react';
import {AlertCircle, X} from 'lucide-react';
import {useDownloadAppStore} from '@/hooks/use-global-store';

const DownloadMobileAppModal = () => {
	const {onClose} = useDownloadAppStore();

	useEffect(() => {
		setTimeout(() => {
			onClose();
		}, 20000);
	}, []);

	return (
		<div className='fixed bottom-0 flex flex-col items-center justify-center w-full bg-[#ffffff20] backdrop-blur-sm z-10'>
			<div className='flex flex-col w-[90%] md:w-[30%] bg-white border border-slate-400 shadow-sm shadow-slate-200 px-4 my-2 sm:my-5 rounded-lg overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between text-sm p-2 space-x-5'>
					<AlertCircle
						size={60}
						className='text-orange-500  animate-pulse'
					/>
					<p className='font-medium'>
						New platform! Still in development. Share with your
						friends too!
					</p>
					{/* <p>Download our mobile app</p> */}

					{/* <Button
						type='button'
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button> */}
				</div>

				{/* <div className='py-4 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3'>
					<Link
						className='animate-pulse'
						target='_blank'
						href={
							'https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile&pcampaignid=web_share'
						}
					>
						<Image
							alt={''}
							width={130}
							height={60}
							unoptimized={true}
							className='object-cover'
							src={'/icon__playstore__2.svg'}
						/>
					</Link>
					<Link
						className=''
						target='_blank'
						href={
							'https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile&pcampaignid=web_share'
						}
					>
						<Image
							alt={''}
							width={130}
							height={60}
							unoptimized={true}
							className='object-cover'
							src={'/icon__playstore__2.svg'}
						/>
					</Link>
				</div> */}
			</div>
		</div>
	);
};

export default DownloadMobileAppModal;
