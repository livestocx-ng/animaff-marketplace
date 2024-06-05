import React, {Fragment} from 'react';

const ChatBubbleSkeleton = () => {
	return (
		<Fragment>
			<div className={`w-full flex justify-start mb-2`}>
				<div className='flex justify-start w-[70%] lg:w-[45%] h-[100px rounded-md border lg:ml-5 shadow-md px-2 py-5 text-sm'></div>
			</div>
			<div className={`w-full flex justify-end mb-2`}>
				<div className='flex  w-[70%] lg:w-[45%] h-[100px rounded-md border lg:mr-5 bg-[#e0fed8] shadow-md px-2 py-5 text-sm'></div>
			</div>
		</Fragment>
	);
};

export default ChatBubbleSkeleton;
