'use client';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {ProductInfoReview} from '@/types/types';
import {FaStar, FaStarHalf} from 'react-icons/fa';
import {useEffect, useReducer, useState} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';
import FormTextAreaInput from '@/components/input/form-text-area-input';
import {ValidateProductReviewFormData} from '@/utils/form-validations/product.validation';
import ButtonLoader from '@/components/loader/button-loader';
import {Progress} from '@/components/ui/progress';

type FormData = {
	rating: number;
	description: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	rating: 0,
	description: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const ProductReviewTab = () => {
	const {user, product, productInfo, updateProductInfo} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		const count = productInfo?.ratings.reduce(
			(acc, entry) => acc + entry.count,
			0
		);

		setTotalCount(count ?? 0);
	}, [productInfo]);

	const ratingPercentage = (rating: number, totalCount: number): number => {
		const ratingCount =
			productInfo?.ratings.find((entry) => entry.rating === rating)
				?.count || 0;
		const percentage = (ratingCount / totalCount) * 100;

		// // console.log(`[PERCENTAGE] :: ${percentage + '%'}`);

		return isNaN(percentage) ? 0 : Number(percentage.toFixed(2));
		// return isNaN(percentage) ? '0%' : percentage.toFixed(2) + '%';
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError = ValidateProductReviewFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError);
			}

			// console.log('[PRODUCT-REVIEW-PAYLOAD] :: ', FormData);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-review/${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			toast.success('New product created');

			updateProductInfo({...productInfo, ...data.data});

			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {rating: 0, description: ''},
			});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[PRODUCT-REVIEW-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='flex flex-col space-y-5 py-10 px-4 md:px-8 w-full'>
			<div className='flex flex-wrap items-start justify-between w-full'>
				<div className='w-full md:w-[40%] flex flex-col space-y-2'>
					<h1 className='text-sm font-semibold'>Review Summary</h1>

					<p className='text-3xl font-semibold text-orange-400'>
						{productInfo?.avgRating}
					</p>

					<StarRating rating={productInfo?.avgRating!} />

					{/* {// console.log(productInfo?.avgRating)} */}

					<p className='text-sm'>
						{productInfo?.reviews.length} Reviews
					</p>

					<div className='space-y-3 pt-2'>
						{productInfo?.ratings.reverse().map((entry) => (
							<div
								key={entry.rating}
								className='flex items-center space-x-5'
							>
								<p className='text-sm font-medium w-[100px]'>
									{entry.rating} star
								</p>
								<Progress
									className='bg-gray-200'
									value={ratingPercentage(
										entry.rating,
										totalCount
									)}
								/>
							</div>
							// <div
							// 	key={entry.rating}
							// 	className='flex items-center space-x-5'
							// >
							// 	<p className='text-sm font-medium w-[100px]'>
							// 		{entry.rating} star
							// 	</p>
							// 	<div className='h-2 w-full bg-gray-200 rounded-lg'>
							// 		<div
							// 			style={{
							// 				width: `${ratingPercentage(
							// 					entry.rating,
							// 					totalCount
							// 				)}`,
							// 			}}
							// 			className={`h-2 rounded-l-lg ${
							// 				ratingPercentage(
							// 					entry.rating,
							// 					totalCount
							// 				) === '100%' && 'rounded-lg'
							// 			} bg-green-600`}
							// 		></div>
							// 	</div>
							// </div>
						))}
					</div>
				</div>

				{user && (
					<form
						onSubmit={handleSubmit}
						className='space-y-5 w-full md:w-[45%] mt-20 md:mt-0'
					>
						<p className='text-sm font-semibold'>
							Be the first to review this product
						</p>

						<div className='flex items-center space-x-10'>
							<p className='text-sm font-semibold'>Ratings</p>
							<div className='flex space-x-3 items-center'>
								{[1, 2, 3, 4, 5].map((item) => (
									<FaStar
										key={item}
										size={20}
										className={`text-gray-300 cursor-pointer ${
											item <= formData.rating
												? 'text-orange-500'
												: ''
										}`}
										onClick={() => {
											if (loading) return;

											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {rating: item},
											});
										}}
									/>
								))}
							</div>
						</div>

						<FormTextAreaInput
							rows={10}
							disabled={loading}
							padding='py-2 px-2'
							name='description'
							handleChange={handleChange}
							value={formData.description}
							placeHolder='Write your review here'
							classes='w-full text-xs placeholder:text-xs border border-main focus:border-main rounded resize-none scrollbar__2'
						/>

						{loading ? (
							<Button
								type='button'
								variant={'outline'}
								className='bg-main hover:bg-main text-white hover:text-white text-xs w-full rounded'
							>
								<ButtonLoader />
							</Button>
						) : (
							<Button
								type='submit'
								variant={'outline'}
								className='bg-main hover:bg-main text-white hover:text-white text-xs w-full rounded'
							>
								Submit
							</Button>
						)}
					</form>
				)}
			</div>

			<div className='w-full space-y-5'>
				<div className='w-full bg-slate-200 text-centr py-4 pl-5 font-semibold'>
					{productInfo?.reviews.length === 0
						? `${productInfo.reviews.length} Reviews`
						: 'Reviews'}
				</div>

				{productInfo?.reviews?.length === 0 && (
					<h1 className='text-x'>No reviews yet</h1>
				)}

				{productInfo?.reviews.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>
		</div>
	);
};

export default ProductReviewTab;

const ReviewCard = ({review}: {review: ProductInfoReview}) => {
	return (
		<div className='flex flex-col space-y-5 md:w-[400px] border-b pb-4'>
			<div className='flex space-x-5 items-center'>
				<div className='relative h-[60px] w-[60px] rounded-full'>
					<Image
						// width={60}
						// height={60}
						fill
						unoptimized={true}
						src={review.user.avatar}
						alt={review.user.firstName}
						className='border rounded-full object-fill h-full w-full'
					/>
				</div>

				<div className='flex flex-col'>
					<p className='font-medium text-xs'>
						{review.user.lastName} {review.user.firstName}
					</p>

					<div className='flex space-x-1'>
						{Array.from({length: review.rating}).map((item) => (
							<FaStar className='text-orange-400' />
						))}
					</div>
				</div>
			</div>

			<div className='text-xs'>{review.description}</div>
		</div>
	);
};

const StarRating = ({rating = 5}: {rating: number}) => {
	const filledStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	const starsArray = Array.from({length: 5}, (_, index) => {
		if (index + 1 <= filledStars) {
			return <FaStar key={index} className='text-orange-500' />;
		} else if (hasHalfStar && index + 0.5 === filledStars + 1) {
			return <FaStarHalf key={index} className='text-orange-500' />;
		} else {
			return <FaStar key={index} className='text-gray-300' />;
		}
	});

	return <div className='flex items-center space-x-2'>{starsArray}</div>;
};
