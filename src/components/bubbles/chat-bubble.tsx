import {useGlobalStore} from '@/store/use-global-store';
import {ChatMessage} from '@/types/types';
import React, {Fragment} from 'react';

interface ChatBubbleProps {
	index: number;
	message: ChatMessage;
}

const ChatBubble = ({index, message}: ChatBubbleProps) => {
	const {user, chatConversationMessages} = useGlobalStore();

	return (
		<Fragment>
			{message?.sender.toString() !== user?.id ? (
				<div
					className={`w-full flex justify-start ${
						index === chatConversationMessages.length - 1
							? 'pb-20'
							: ''
					} mb-2`}
				>
					<div className='flex justify-start w-[70%] lg:w-[45%] h-[100px rounded-md border lg:ml-5 shadow-md px-2 py-4 text-sm'>
						{message.content}
					</div>
				</div>
			) : (
				<div
					className={`w-full flex justify-end ${
						index === chatConversationMessages.length - 1
							? 'pb-20'
							: ''
					} mb-2`}
				>
					<div className='flex  w-[70%] lg:w-[45%] h-[100px rounded-md border lg:mr-5 bg-[#e0fed8] shadow-md px-2 py-4 text-sm'>
						{message.content}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default ChatBubble;
