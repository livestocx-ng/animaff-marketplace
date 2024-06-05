'use client';
import {X} from 'lucide-react';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useReadNotificationModalStore,
} from '@/store/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';

const NotificationModal = () => {
	const {user, updateCurrentAccountTab, updateNotification} =
		useGlobalStore();

	const {onClose, payload} = useReadNotificationModalStore();

	const handleReadNotification = async () => {
		if (payload?.isRead === true) return;

		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/notifications/read?notificationId=${payload?.id}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log(data);
			updateNotification(payload?.id!, data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[READ-NOTIFICATION-ERROR]', _error);

			toast.error('Error');
		}
	};

	useEffect(() => {
		handleReadNotification();
	}, []);

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[40%] bg-white py-2 px-4 rounded overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='font-semibold'>{payload?.title}</h1>

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

				<div className='flex flex-col space-y-2 w-full py-5'>
					<p className='text-sm leading-7'>{payload?.message}</p>

					{payload?.notificationType === 'PRODUCT' && (
						<p className='text-sm'>
							You can navigate to desired items{' '}
							<span
								onClick={() => {
									onClose();
									updateCurrentAccountTab('Desired Items');
								}}
								className='underline cursor-pointer text-sky-600'
							>
								here
							</span>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationModal;
