'use client';
import Image from 'next/image';
import {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {
	useGlobalStore,
	useReadNotificationModalStore,
} from '@/store/use-global-store';

const NotificationsContent = () => {
	const {user, notifications, updateNotifications, updatePagination} =
		useGlobalStore();

	const readNotificationModal = useReadNotificationModalStore();

	const fetchNotifications = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/notifications/fetch-all`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data);

			updateNotifications(data.data.notifications);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-NOTIFICATIONS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchNotifications();
	}, []);

	// console.log(notifications);

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			{notifications.length === 0 && (
				<div className='flex flex-col items-center justify-center py-20'>
					<Image
						alt='logo'
						width={150}
						height={150}
						unoptimized={true}
						src={'/logo.svg'}
						className='opacity-50'
					/>
				</div>
			)}

			{notifications.length > 0 && (
				<div className='flex flex-col space-y-5 md:px-8 pb-10'>
					{notifications.map((notification) => (
						<div
							onClick={() => {
								readNotificationModal.updatePayload(
									notification
								);
								readNotificationModal.onOpen();
							}}
							key={notification.id}
							className='pb-4 border-b cursor-pointer'
						>
							<h1 className='text-sm font-semibold'>
								{notification.title}
							</h1>
							<p className='text-sm'>
								{notification.message.slice(0, 150)}...
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default NotificationsContent;
