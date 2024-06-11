import React from 'react';
import Image from 'next/image';
import {ChatConversation} from '@/types/types';
import {useGlobalStore} from '@/hooks/use-global-store';

interface ChatConversationCardProps {
	conversation: ChatConversation;
}

const ChatConversationCard = ({conversation}: ChatConversationCardProps) => {
	const {user, updateShowChatConversation, updateChatConversation} =
		useGlobalStore();

	console.log(conversation);

	return (
		<div
			onClick={() => {
				updateShowChatConversation(true);
				updateChatConversation(conversation);
			}}
			className='flex items-center justify-between w-full cursor-pointer transition-all ease-in-out duration-700 hover:translate-y-1 border-b pb-3'
		>
			<div className='flex items-center space-x-2 w-full'>
				<div className='h-[50px] w-[50px] rounded-full border relative'>
					<Image
						alt='image'
						fill
						unoptimized={true}
						src={
							conversation?.user1.id.toString() === user?.id
								? conversation?.user2.role === 'FARMER'
									? conversation?.vendor.avatar
									: conversation?.user2.avatar
								: conversation?.user1.role === 'FARMER'
								? conversation?.vendor.avatar
								: conversation?.user1.avatar
						}
						className='object-cover rounded-full h-full w-full'
					/>
				</div>
				<div className='flex flex-col'>
					<div className='flex items-center space-x-4'>
						<p className='font-semibold text-sm'>
							{conversation?.user1.id.toString() === user?.id
								? conversation?.user2.name
								: conversation?.user1.name}
						</p>

						{(conversation?.user1?.role === 'ADMIN' && user?.id !== conversation?.user1?.id.toString()) ? (
							<Image
								alt='image'
								width={40}
								height={40}
								src={'/icon__verified__1.svg'}
								unoptimized={true}
								className='object-cover h-full w-full'
							/>
						) : (conversation?.user2?.role  === 'ADMIN' && user?.id !== conversation?.user2?.id.toString()) ? (
							<Image
								width={40}
								height={40}
								alt='image'
								unoptimized={true}
								src={'/icon__verified__1.svg'}
								className='object-cover h-full w-full'
							/>
						) : (
							<div></div>
						)}
					</div>

					{conversation?.lastConversationMessage.length > 0 && (
						<p className='text-[12px]'>
							{conversation?.lastConversationMessage.length > 10
								? `${conversation?.lastConversationMessage.slice(
										0,
										10
								  )}...`
								: conversation?.lastConversationMessage}
						</p>
					)}
				</div>
			</div>

			{conversation?.unreadMessages !== 0 && (
				<div
					className={`bg-red-400 rounded-full h-5 w-5 text-white font-bold text-[8px] flex items-center justify-center mr-5`}
				>
					{conversation?.unreadMessages}
				</div>
			)}
		</div>
	);
};

export default ChatConversationCard;
