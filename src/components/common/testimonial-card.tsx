import Image from 'next/image';
import {FaStar} from 'react-icons/fa';
import {Testimonial} from '@/types/types';

const TestimonialCard = ({data}: {data: Testimonial}) => {
	return (
		<div className='flex flex-col items-cente justify-center space-y-3 md:w-[350px] bg-white border rounded-lg p-2 mb-5 md:mb-0'>
			<div className='flex items-center text-main font-medium space-x-3'>
				<div className='w-[50px] h-[50px] relative'>
					<Image
						// width={50}
						// height={50}
						fill
						alt='testimonial'
						src={data.avatarUrl}
						unoptimized={true}
						className='rounded-full object-cover border border-slate-400 shadow-md'
					/>
				</div>

				<p className='text-xs'>{data.author}</p>

				<div className='flex space-x-1 items-center'>
					{[1, 2, 3, 4, 5].map((item) => (
						<FaStar
							key={item}
							className='text-orange-500'
							size={15}
						/>
					))}
				</div>
			</div>

			<p className='text-center text-xs leading-6'>{data.testimonial}</p>
		</div>
	);
};

export default TestimonialCard;
