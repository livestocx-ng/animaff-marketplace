import Image from 'next/image';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {ChatMessage} from '@/types/types';
import {SendHorizonal, X} from 'lucide-react';
import ChatBubble from '../bubbles/chat-bubble';
import FormTextInput from '../input/form-text-input';
import {useGlobalStore} from '@/hooks/use-global-store';
import React, {useEffect, useReducer, useRef} from 'react';
import {getSocketInstance} from '@/providers/socket-provider';
import EmptyMessagesAnimation from '../../../public/animations/animation__chat__1.json';

type FormData = {
	message: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	message: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const ChatConversationContent = () => {
	const {
		user,
		chatConversation,
		updateChatConversation,
		updateChatConversations,
		chatConversationMessages,
		updateShowChatConversation,
		addChatConversationMessage,
		updateChatConversationMessages,
	} = useGlobalStore();

	const messageIds = new Set();
	const SocketInstance = getSocketInstance();

	const notificationRef = useRef<HTMLAudioElement>(null);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const fetchChatMessages = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation/messages?conversation=${chatConversation?.id}&page=1`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log('[CONVERSATION-MESSAGES-RESPONSE] :: ', data);

			updateChatConversationMessages(
				data.data.messages.sort(
					(messageA: ChatMessage, messageB: ChatMessage) =>
						messageA.id - messageB.id
				)
			);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchChatMessages();
	}, []);

	useEffect(() => {
		SocketInstance.on('NEW-CHAT-MESSAGE', (message: ChatMessage) => {
			if (
				chatConversation?.id === message.conversation &&
				!messageIds.has(message.id) &&
				!chatConversationMessages.some(
					(_message) => _message.id === message.id
				)
			) {
				addChatConversationMessage(message);

				messageIds.add(message.id);

				// if (message.recipient === parseInt(user?.id!)) {
				// 	notificationRef?.current?.play();
				// }
			}
		});
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSendMessage = () => {
		try {
			if (formData.message.length === 0) {
				return;
			}

			SocketInstance.emit('SEND-CHAT-MESSAGE', {
				sender: user?.id,
				recipient:
					chatConversation?.user1.id.toString() === user?.id
						? chatConversation?.user2.id
						: chatConversation?.user1.id,
				senderName: `${user?.firstName} ${user?.lastName}`,
				content: formData.message,
				conversation: chatConversation?.id,
			});

			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {message: ''},
			});
		} catch (error) {
			console.log('[SEND-MESSAGE-ERROR] :: ', error);
		}
	};

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

			console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateChatConversations(data.data.conversations);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	return (
		<div className='w-full lg:w-full border rounded-t-md flex flex-col space-y-4 h-full overflow-y-auto scrollbar__2 relative'>
			<div className='sticky z-[5] top-0 w-full bg-white py-2 px-5 shadow-sm border-b flex justify-between items-center h-[15%]'>
				<div className='flex items-center space-x-2'>
					<div className='h-[50px] w-[50px] rounded-full border relative shadow-lg'>
						<Image
							alt='image'
							fill
							unoptimized={true}
							className='object-cover rounded-full h-full w-full'
							// src={'/user__1.svg'}
							src={
								chatConversation?.user1.id.toString() ===
								user?.id
									? chatConversation?.user2.role === 'FARMER'
										? chatConversation?.vendor.avatar!
										: chatConversation?.user2.avatar!
									: chatConversation?.user1.role === 'FARMER'
									? chatConversation?.vendor.avatar!
									: chatConversation?.user1.avatar!
							}
						/>
					</div>

					<div className='flex items-center space-x-4'>
						<p className='font-semibold text-sm'>
							{chatConversation?.user1.id.toString() === user?.id
								? chatConversation?.user2.name
								: chatConversation?.user1.name}
						</p>

						{chatConversation?.user1?.role === 'ADMIN' ? (
							<Image
								alt='image'
								width={40}
								height={40}
								src={'/icon__verified__1.svg'}
								unoptimized={true}
								className='object-cover h-full w-full'
							/>
						) : chatConversation?.user2?.role === 'ADMIN' ? (
							<Image
								alt='image'
								width={40}
								height={40}
								src={'/icon__verified__1.svg'}
								unoptimized={true}
								className='object-cover h-full w-full'
							/>
						) : (
							<div></div>
						)}
					</div>
				</div>

				<X
					size={15}
					className='text-red-500 cursor-pointer'
					onClick={() => {
						fetchChatConversations();
						updateChatConversation(null);
						updateShowChatConversation(false);
						updateChatConversationMessages([]);
					}}
				/>
			</div>

			<div className='h-[85%] flex flex-col justify-start'>
				{/* NOTIFICATION COMPONENT */}
				<audio
					className='hidden'
					ref={notificationRef}
					src='/audio/audio__chat__notification.wav'
				/>

				{chatConversationMessages.length === 0 && (
					<div className='h-[80%] w-1/2 mx-auto bg-white flex flex-col items-center justify-center'>
						<Lottie
							loop={true}
							className='h-1/2'
							animationData={EmptyMessagesAnimation}
						/>
					</div>
				)}

				{chatConversationMessages.map((message, index: number) => (
					<ChatBubble
						key={message.id}
						index={index}
						message={message}
					/>
				))}

				<div className='sticky z-[5] bottom-0 w-full py-2 px-2 md:px-5 shadow-sm flex items-center space-x-2 backdrop-blur-sm'>
					<FormTextInput
						name='message'
						value={formData.message}
						padding='py-3 px-4'
						placeHolder='Message'
						handleChange={handleChange}
						classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
					/>

					<div
						className={`w-10 h-10 bg-main flex items-center justify-center rounded-full ${
							formData.message.length === 0
								? ''
								: 'cursor-pointer'
						}`}
					>
						<SendHorizonal
							size={15}
							className='text-white'
							onClick={handleSendMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatConversationContent;
