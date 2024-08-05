import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import Image from 'next/image';
import {useEffect} from 'react';
import {Copy} from 'lucide-react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useGlobalStore} from '@/hooks/use-global-store';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {formatVendorSlug} from '@/utils/slug.formatter';

const DashboardContent = () => {
	const {
		user,
		vendorProfile,
		updateUser,
		updateVendorProfile,
		updateCurrentAccountTab,
	} = useGlobalStore();

	const fetchVendorProfile = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data);

			updateVendorProfile(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-VENDOR-PROFILE-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchVendorProfile();
	}, []);

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			<div className='flex flex-col md:flex-row items-center justify-between w-full'>
				<div className='p-5 flex flex-col items-center justify-between w-full md:w-[45%] h-[350px] space-y-3 border rounded-lg'>
					<div className='text-center'>
						<div className='h-[150px] w-[150px] rounded-full border relative'>
							<Image
								fill
								alt='image'
								unoptimized={true}
								src={user?.avatar ?? '/user__1.svg'}
								className='object-cover rounded-full h-full w-full'
							/>
						</div>

						<h1 className='text-base'>
							{user?.lastName} {user?.firstName}
						</h1>
						<p className='text-sm capitalize text-red-600 underline'>
							{user?.role === 'CUSTOMER' ? 'CUSTOMER' : 'SELLER'}
						</p>
					</div>

					{user?.role === 'FARMER' &&
						vendorProfile?.slug?.length! > 1 && (
							<div className='flex items-center space-x-4'>
								<p
									// onClick={() => updateCurrentAccountTab('Settings')}
									className='text-sm'
								>
									Share Profile:
								</p>

								<div className='flex space-x-2'>
									<WhatsappShareButton
										url={`https://animaff.com/store/${formatVendorSlug(
											vendorProfile!
										)}`}
										title={`Check out my min-website/online store ${vendorProfile?.name} on Animaff: `}
									>
										<WhatsappIcon size={25} round />
									</WhatsappShareButton>
									<FacebookShareButton
										url={`https://animaff.com/store/${formatVendorSlug(
											vendorProfile!
										)}`}
										title={`Check out my min-website/online store ${vendorProfile?.name} on Animaff: `}
									>
										<FacebookIcon size={25} round />
									</FacebookShareButton>
									<TwitterShareButton
										url={`https://animaff.com/store/${formatVendorSlug(
											vendorProfile!
										)}`}
										title={`Check out my min-website/online store ${vendorProfile?.name} on Animaff: `}
									>
										<TwitterIcon size={25} round />
									</TwitterShareButton>

									<CopyToClipboard
										onCopy={(
											text: string,
											result: boolean
										) => {
											toast.success(
												'Copied to clipboard'
											);
										}}
										text={`https://animaff.com/store/${formatVendorSlug(
											vendorProfile!
										)}`}
									>
										<div className='rounded-full border border-slate-400 h-7 w-7 flex items-center justify-center cursor-pointer'>
											<Copy className='h-4 w-4' />
										</div>
									</CopyToClipboard>
								</div>
							</div>
						)}
				</div>
				<div className='flex flex-col items-start justify-between h-[350px] w-full md:w-[45%]'>
					<div className='p-5 flex flex-col items-start w-full h-full justify-between border rounded-lg'>
						<div className='space-y-3'>
							<h1 className='text-base font-medium'>Profile</h1>
							<div className='space-y-1 '>
								<h1 className='text-sm'>
									<span className='font-medium'>Name: </span>
									{user?.lastName} {user?.firstName}
								</h1>
							</div>
							<div className='space-y-3'>
								<h1 className='text-sm'>
									<span className='font-medium'>Email: </span>
									{user?.email}
								</h1>
								<h1 className='text-sm'>
									<span className='font-medium'>Phone: </span>
									{user?.phoneNumber}
								</h1>
							</div>
						</div>
						<p
							onClick={() => updateCurrentAccountTab('Settings')}
							className='text-main text-sm font-semibold cursor-pointer'
						>
							Edit Profile
						</p>
					</div>
				</div>
			</div>

			{/* <DataTable columns={columns} data={RecentOrders} /> */}
		</div>
	);
};

export default DashboardContent;
