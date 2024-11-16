import Link from 'next/link';
import React, {Fragment} from 'react';
import {ChatMessage} from '@/types/types';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';

interface ChatBubbleProps {
	index: number;
	message: ChatMessage;
}

const ChatBubble = ({index, message}: ChatBubbleProps) => {
	const {user, chatConversationMessages} = useGlobalStore();

	return (
		<Fragment>
			{message?.sender.toString() !== user?.id ? (
				<div className={`w-full flex justify-start ${index === (chatConversationMessages.length-1) ? 'pb-20' : ''} mb-2`}>
					<div className='flex justify-start w-[70%] lg:w-[45%] h-[100px rounded-md border lg:ml-5 shadow-md px-2 py-4 text-sm'>
						<div>
							{message.content}
					
							{message.hasCTA && (
								<div className="mt-5 flex justify-center">
									<Link 
										target='_blank'
										href={`${message.ctaType == 'SASS' ? '/enterprise': '/'}`}
									>
										<Button
									
											type='button'
											className='bg-green-600 text-white hover:bg-green-700 w-fit rounded-full py-4 text-sm'
										>
											{message.ctaType == 'SASS' ? 'Learn More': ''}
										</Button>
									</Link>
								</div>
							)}
						</div>
					</div>

				</div>
			) : (
				<div className={`w-full flex justify-end ${index === (chatConversationMessages.length-1) ? 'pb-20' : ''} mb-2`}>
					<div className='flex  w-[70%] lg:w-[45%] h-[100px rounded-md border lg:mr-5 bg-[#e0fed8] shadow-md px-2 py-4 text-sm'>
					<div>
							{message.content}
					
							{message.hasCTA && (
								<div className="mt-5 flex justify-center">
									<Link 
										target='_blank'
										href={`${message.ctaType == 'SASS' ? '/enterprise': '/'}`}
									>
										<Button
									
											type='button'
											className='bg-green-600 text-white hover:bg-green-700 w-fit rounded-full py-4 text-sm'
										>
											{message.ctaType == 'SASS' ? 'Learn More': ''}
										</Button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default ChatBubble;
