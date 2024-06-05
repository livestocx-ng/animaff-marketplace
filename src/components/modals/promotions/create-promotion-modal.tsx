'use client';
import Image from 'next/image';
import {
	useGlobalStore,
	useCreatePromotionModalStore,
} from '@/store/use-global-store';
import Lottie from 'lottie-react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {RotateCw, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import {PaystackButton} from 'react-paystack';
import {PriceFormatter} from '@/utils/price.formatter';
import {getMediaImageUrl} from '@/utils/media/media.url';
import ButtonLoader from '@/components/loader/button-loader';
import EmptyAnimation from '../../../../public/animations/animation__3.json';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';

const CreatePromotionModal = () => {
	const {user} = useUserHook();
	const {
		promotions,
		updatePromotions,
		userPromotionPlan,
		promotionProducts,
		updatePromotionProducts,
		promotionProductsHasNextPage,
		updatePromotionProductsPagination,
	} = useGlobalStore();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [productIds, setProductIds] = useState<number[]>([]);

	const modal = useCreatePromotionModalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const fetchPromotionProducts = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/promotions/user-products?page=${currentPage}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePromotionProductsPagination(
				data.data.totalPages,
				data.data.hasNext
			);
			updatePromotionProducts(data.data.products);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	useEffect(() => {
		fetchPromotionProducts();
	}, []);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		productId: string
	) => {
		if (productIds.includes(parseInt(productId))) {
			return setProductIds(
				productIds.filter((id) => id !== parseInt(productId))
			);
		}

		if (userPromotionPlan?.plan_info.product_count === productIds.length) {
			return toast.error(
				`Sorry, your current plan only allows you to promote only ${userPromotionPlan?.plan_info.product_count} product(s)`
			);
		}

		if (event.target.checked) {
			setProductIds([...productIds, parseInt(productId)]);
		} else {
			setProductIds(
				productIds.filter((id) => id !== parseInt(productId))
			);
		}
	};

	const handleSuccess = async (response: any) => {
		try {
			setLoading(true);
			// console.log(response);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/promotions/create`,
				{
					payment_gateway: 'PAYSTACK',
					payment_date: new Date(),
					payment_reference: response.reference,
					amount_paid:
						userPromotionPlan?.plan_info.discount_price!.toString(),
					payment_method: 'WEB',
					product_ids: productIds,
				},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePromotions([data.data, ...promotions]);
			updatePromotionProducts(
				promotionProducts.filter(
					(product) => !productIds.includes(parseInt(product.id))
				)
			);

			setLoading(false);

			modal.onClose();

			toast.success(`Promotion created successfully!`, {duration: 3500});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[PROMOTION-PAYMENT-ERROR]', _error);

			toast.error('An error occurred.');
		}
	};

	const handleClose = () => {
		toast.error('Payment cancelled!');
	};

	const payStackButtonProps = {
		reference: generateRandomPaymentReference(),
		email: user?.email!,
		metadata: {
			custom_fields: [
				{
					display_name: 'payment_type',
					variable_name: 'payment_type',
					value: 'PROMOTION',
				},
				{
					display_name: 'product_ids',
					variable_name: 'product_ids',
					value: productIds.toString(),
				},
			],
		},
		amount: userPromotionPlan?.plan_info.discount_price! * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		text: 'Promote',
		onSuccess: (response: any) => handleSuccess(response),
		onClose: handleClose,
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<div className='flex flex-col w-[90%] lg:w-[35%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4 w-full'>
					{loading ? (
						<Button
							type='button'
							variant={'outline'}
							className='w-fit bg-main hover:bg-main text-xs text-white hover:text-white rounded-md border-0 py-3 px-6'
						>
							<ButtonLoader />
						</Button>
					) : (
						<>
							{productIds.length ===
							userPromotionPlan?.plan_info.product_count ? (
								<PaystackButton
									{...payStackButtonProps}
									className='w-fit bg-main hover:bg-main text-xs text-white hover:text-white rounded-md border-0 py-3 px-6'
								/>
							) : (
								<Button
									type='button'
									disabled={true}
									variant={'outline'}
									className='w-fit bg-main hover:bg-main text-xs text-white hover:text-white rounded-md border-0 py-3 px-6'
								>
									Promote
								</Button>
							)}
						</>
					)}

					<Button
						type='button'
						onClick={() => modal.onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col items-start w-full space-y-3 mt-3'>
					{promotionProducts?.length === 0 && (
						<div className='w-full bg-white flex flex-col items-center justify-center'>
							<div className='h-[300px] w-1/3 mx-auto bg-white'>
								<Lottie
									loop={true}
									className='h-full'
									animationData={EmptyAnimation}
								/>
							</div>
						</div>
					)}

					{promotionProducts?.map((product) => (
						<div
							key={product.id}
							className={`rounded-md p-2 border shadow-md ${
								productIds.includes(parseInt(product.id))
									? 'shadow-green-100 border-green-200'
									: 'border-slate-300'
							} flex items-center justify-between w-full`}
						>
							<div className='flex items-center space-x-2'>
								<input
									type='checkbox'
									checked={productIds.includes(
										parseInt(product.id)
									)}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) =>
										handleCheckboxChange(event, product?.id)
									}
								/>

								<div className='w-[80px] h-[60px] rounded-md relative'>
									<Image
										fill
										alt=''
										src={getMediaImageUrl(product!)}
										className='object-cover rounded-md'
									/>
								</div>

								<div className='space-y-1'>
									<h1 className='text-xs font-medium'>
										{product?.name}
									</h1>
									<p className='text-xs capitalize'>
										{product?.category.toLowerCase()}
									</p>
								</div>
							</div>

							<p className='text-xs'>
								{product?.isNegotiable
									? PriceFormatter(product?.discountPrice)
									: PriceFormatter(product?.price)}
							</p>
						</div>
					))}

					{promotionProductsHasNextPage && (
						<div className='flex justify-center mt-5 mx-auto'>
							<Button
								type='button'
								variant={'outline'}
								onClick={() => {
									setCurrentPage(currentPage + 1);
									window.scrollTo({
										top: 50,
										behavior: 'smooth',
									});
								}}
								className='flex items-center space-x-1 bg-white border border-slate-400 hover:bg:white focus:bg-white text-xs h-6'
							>
								<RotateCw size={12} />
								<span>Load More</span>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreatePromotionModal;
