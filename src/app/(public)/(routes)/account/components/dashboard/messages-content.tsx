'use client';
import {useEffect} from 'react';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useGlobalStore} from '@/store/use-global-store';
import ChatConversationCard from '@/components/chat/chat-conversation-card';
import ChatConversationContent from '@/components/chat/chat-conversation-content';
import EmptyMessagesAnimation from '../../../../../../../public/animations/animation__chat__1.json';

const MessagesContent = () => {
	const {
		user,
		chatConversations,
		showChatConversation,
		updateChatConversations,
		updateShowChatConversation,
	} = useGlobalStore();

	const fetchChatConversations = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations?page=1`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateChatConversations(data.data.conversations);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchChatConversations();
	}, []);

	return (
		<div className='w-full md:w-[78%] flex items-center items-star justify-between h-[70vh]'>
			{!showChatConversation && chatConversations?.length === 0 && (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Lottie
						loop={true}
						className='h-1/2'
						animationData={EmptyMessagesAnimation}
					/>
				</div>
			)}

			{!showChatConversation && chatConversations?.length > 0 && (
				<div className='w-full md:w-[30%] md:border-r hidde flex lg:flex flex-col space-y-4 h-full overflow-y-auto scrollbar__2'>
					{chatConversations?.map((conversation) => (
						<ChatConversationCard
							key={conversation?.id}
							conversation={conversation}
						/>
					))}
				</div>
			)}

			{showChatConversation && <ChatConversationContent />}

			{/* <div className='flex flex-col items-center justify-center py-20 w-full'>
				<Image
					alt='logo'
					width={150}
					height={150}
					unoptimized={true}
					src={'/logo.svg'}
					className='opacity-50'
				/>
			</div> */}
		</div>
	);
};

export default MessagesContent;
