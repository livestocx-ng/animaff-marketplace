import {
	useGlobalStore,
	useVerifyProductUploadSubscriptionPaymentModalStore,
} from '@/hooks/use-global-store';
import Lottie from 'lottie-react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import DisabledAccountAnimation from '../../../../public/animations/animation__5.json';

interface VerifyProductUploadSubscriptionPaymentModalProps {
	transactionRef: string;
	transactionStatus: string;
}

const VerifyProductUploadSubscriptionPaymentModal = ({
	transactionRef,
	transactionStatus,
}: VerifyProductUploadSubscriptionPaymentModalProps) => {
	const router = useRouter();

	const {user, updateUser, updateUserProductUploadSubscription} =
		useGlobalStore();
	const modal = useVerifyProductUploadSubscriptionPaymentModalStore();

	const [isVerifyTransactionPending, setIsVerifyTransactionPending] =
		useState<boolean>(false);

	const initializeVerification = () => {
		if (
			transactionRef &&
			transactionStatus === 'success' &&
			!isVerifyTransactionPending
		) {
			handleCreateProductUploadSubscription(transactionRef);
		}
	};

	useEffect(() => {
		initializeVerification();
	}, []);

	const handleCreateProductUploadSubscription = async (reference: string) => {
		try {
			if (!user || isVerifyTransactionPending) return;

			setIsVerifyTransactionPending(true);

			const verifyTransactionResponse = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/payments/verify-product-upload-subscription-payment?reference=${reference}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log(verifyTransactionResponse);

			if (verifyTransactionResponse.data.data.paymentSession === true) {
				const {data} = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/create-product-upload-subscription?plan=${verifyTransactionResponse.data.data.plan}`,
					{
						payment_gateway: 'STRIPE',
						payment_date: new Date(),
						payment_reference: reference,
						payment_method: 'WEB',
					},
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				);
				setIsVerifyTransactionPending(false);

				const cookieUpdate = await axios.patch(
					'/api/auth/update-cookies',
					{
						isMonthlyProductUploadSubscriptionActive: true,
					}
				);

				await updateUser(cookieUpdate.data);

				updateUserProductUploadSubscription(data.data);

				modal.onClose();

				toast.success(`Product upload subscription successful!`, {
					duration: 3500,
				});

				return router.push('/account');
			} else {
				setIsVerifyTransactionPending(false);

				return toast.success(`Payment unverified!`, {duration: 3500});
			}
		} catch (error) {
			setIsVerifyTransactionPending(false);

			const _error = error as AxiosError;

			console.log('[PROMOTION-PAYMENT-ERROR]', _error);

			// toast.error('An error occurred.');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#ffffff40] backdrop-blur-sm z-20'>
			<div className='flex flex-col items-center justify-center w-[90%] lg:w-[40%] bg-whit py-2 px-4 h-[400px] overflow-y-auto rounded-md scrollbar__1'>
				<div className='h-[500px] w-1/2 mx-auto'>
					<Lottie
						loop={true}
						className='h-full'
						animationData={DisabledAccountAnimation}
					/>
				</div>
			</div>
		</div>
	);
};

export default VerifyProductUploadSubscriptionPaymentModal;
