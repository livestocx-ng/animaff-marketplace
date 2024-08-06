import Link from 'next/link';
import Image from 'next/image';
import {useGlobalStore} from '@/hooks/use-global-store';

const SellerFooter = () => {
	const {vendor} = useGlobalStore();

	return (
		<div className='pt-5 md:pt-10 w-full bg-main flex flex-col px-5 sm:px-10'>
			<div className='flex flex-row flex-wrap items-start justify-between w-full'>
				<div className='mb-10 sm:mb-0 flex flex-col space-y-2 w-full md:w-fit'>
					<Image
						alt='logo'
						width={30}
						height={30}
						unoptimized={true}
						src={vendor?.avatar!}
						className='rounded-md'
					/>

					<h1 className='text-white text-xs'>{vendor?.name}</h1>

					<div className='flex flex-col items-start space-y-2'>
						<p className='text-white text-xs'>
							{vendor?.address} {vendor?.city}, {vendor?.state}
						</p>

						<p className='text-white text-xs'>{vendor?.email}</p>
					</div>
				</div>

				<div className='flex flex-col justify-start md:items-center md:justify-center space-y-5 mt-5'>
					<div className='flex items-center space-x-10 sm:space-x-3'>
						<Link
							target='_blank'
							href={
								vendor?.facebookUrl ? vendor?.facebookUrl : '#'
							}
						>
							<Image
								alt={''}
								width={30}
								height={30}
								unoptimized={true}
								className='object-cover'
								src={'/icon__facebook.svg'}
							/>
						</Link>
						<Link
							target='_blank'
							href={vendor?.twitterUrl ? vendor?.twitterUrl : '#'}
						>
							<Image
								alt={''}
								width={30}
								height={30}
								unoptimized={true}
								className='object-cover'
								src={'/icon__twitter.svg'}
							/>
						</Link>
						<Link
							target='_blank'
							href={
								vendor?.instagramUrl
									? vendor?.instagramUrl
									: '#'
							}
						>
							<Image
								alt={''}
								width={30}
								height={30}
								unoptimized={true}
								className='object-cover'
								src={'/icon__instagram.svg'}
							/>
						</Link>
					</div>
				</div>
			</div>

			<div className='border-t border-t-[#ffffff80] w-full mt-5 md:mt-5 py-3 text-center text-[#ffffff80] text-xs'>
				Powered by Livestocx Inc &copy; {new Date().getFullYear()}. All
				Rights Reserved
			</div>
		</div>
	);
};

export default SellerFooter;
