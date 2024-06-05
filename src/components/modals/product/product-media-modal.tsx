'use client';
import {Maximize2, ChevronLeftCircle, ChevronRightCircle} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useProductMediaModalStore} from '@/hooks/use-global-store';

const ProductMediaModal = () => {
	const modal = useProductMediaModalStore();

	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [mediaUrl, updateMediaUrl] = useState<string>(
		modal?.payload[0]?.mediaUrl
	);

	const handleModalClose = () => modal.onClose();

	const handleEscModalClose = (event: KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Esc') {
			return modal.onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleEscModalClose);
	});

	const handleImageChange = (increment: number) => {
		const newIndex = currentIndex + increment;

		if (
			modal?.payload.length > 0 &&
			newIndex >= 0 &&
			newIndex < modal?.payload.length
		) {
			setCurrentIndex(newIndex);
			updateMediaUrl(modal?.payload[newIndex].mediaUrl);
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111195] backdrop-blur-sm z-10'>
			<div className='flex items-center justify-center sm:space-x- w-full relative'>
				<ChevronLeftCircle
					onClick={() => handleImageChange(-1)}
					className='text-orange-400 h-8 w-8 bg-white rounded-full cursor-pointer hidden sm:block absolute top-30 left-5 z-10'
				/>

				<ChevronLeftCircle
					onClick={() => handleImageChange(-1)}
					className='text-orange-400 h-8 w-8 bg-white rounded-full cursor-pointer block sm:hidden absolute top-30 left-5 z-10'
				/>

				<div className='h-[300px] md:h-[600px] w-[300px] md:w-[600px] relative'>
					<Image
						fill
						alt={'product'}
						src={mediaUrl}
						unoptimized={true}
						className='object-cover h-full w-full'
					/>

					<p
						onClick={handleModalClose}
						className='absolute top-0 right-0 bg-red-400 p-2 bg-red-0 flex justify-center items-center cursor-pointer'
					>
						<Maximize2
							className='text-white h-6 w-6'
							color='white'
						/>
					</p>
				</div>

				<ChevronRightCircle
					onClick={() => handleImageChange(1)}
					className='text-orange-400 h-8 w-8 bg-white rounded-full cursor-pointer hidden sm:block absolute top-30 right-5 z-10'
				/>

				<ChevronRightCircle
					onClick={() => handleImageChange(1)}
					className='text-orange-400 h-8 w-8 bg-white rounded-full cursor-pointer block sm:hidden absolute top-30 right-5 z-10'
				/>
			</div>
		</div>
		// <Modal
		// 	title='Create Store'
		// 	isOpen={modal.isOpen}
		// 	onClose={modal.onClose}
		// 	description='Add a new store to manage products and categories'
		// >
		// 	<div className=''></div>
		// </Modal>
	);
};

export default ProductMediaModal;
