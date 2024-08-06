import {
	useGlobalStore,
	usePremiumSubscriptionSuccessModalStore,
	useVerifyPremiumSubscriptionPaymentModalStore,
} from '@/hooks/use-global-store';
import Lottie from 'lottie-react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import CreditCardAnimation from '../../../../public/animations/animation__5.json';

interface VerifyPremiumSubscriptionPaymentModalProps {
	transactionRef: string;
	transactionStatus: string;
}

const VerifyPremiumSubscriptionPaymentModal = ({
	transactionRef,
	transactionStatus,
}: VerifyPremiumSubscriptionPaymentModalProps) => {
	const router = useRouter();

	const {
		user,
		updateUser,
		updateVendorProfile,
		updateUserPremiumSubscription,
	} = useGlobalStore();

	const modal = useVerifyPremiumSubscriptionPaymentModalStore();
	const premiumSubscriptionSuccessModal =
		usePremiumSubscriptionSuccessModalStore();

	const [isVerifyTransactionPending, setIsVerifyTransactionPending] =
		useState<boolean>(false);

	const initializeVerification = () => {
		if (
			transactionRef &&
			transactionStatus === 'success' &&
			!isVerifyTransactionPending
		) {
			handleCreatePremiumSubscription(transactionRef);
		}
	};

	useEffect(() => {
		initializeVerification();
	}, [user]);

	const handleCreatePremiumSubscription = async (reference: string) => {
		try {
			if (!user || isVerifyTransactionPending) return;

			setIsVerifyTransactionPending(true);

			const verifyTransactionResponse = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/payments/verify-premium-subscription-payment?reference=${reference}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			if (verifyTransactionResponse.data.data.paymentSession === true) {
				const profileLocalStorageData = localStorage.getItem(
					'animaff_premium_subscription_data'
				);
				const profileFormData =
					profileLocalStorageData !== null &&
					profileLocalStorageData !== 'undefined'
						? JSON.parse(profileLocalStorageData)
						: {};

				const [
					profileUpdateResponse,
					createPremiumSubscriptionResponse,
				] = await Promise.all([
					axios.patch(
						`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-update-profile`,
						profileFormData,
						{
							headers: {
								Authorization: user?.accessToken,
							},
						}
					),
					axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/vendor/create-premium-subscription?plan=${verifyTransactionResponse.data.data.plan}`,
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
					),
				]);

				if (profileUpdateResponse.status === 200) {
					const cookieUpdate = await axios.patch(
						'/api/auth/update-cookies',
						{
							isVendorProfileUpdated: true,
						}
					);

					updateUser(cookieUpdate.data);
					updateVendorProfile(profileUpdateResponse.data.data);

					setIsVerifyTransactionPending(false);

					updateUserPremiumSubscription(
						createPremiumSubscriptionResponse.data.data
					);

					toast.success(`Premium subscription successful!`, {
						duration: 3500,
						className: 'text-sm',
					});

					localStorage.removeItem(
						'animaff_premium_subscription_data'
					);

					modal.onClose();
					premiumSubscriptionSuccessModal.onOpen();

					return router.push('/enterprise');
				}
			} else {
				setIsVerifyTransactionPending(false);

				modal.onClose();

				return toast.success(`Payment unverified!`, {
					duration: 3500,
					className: 'text-sm',
				});
			}
		} catch (error) {
			setIsVerifyTransactionPending(false);

			const _error = error as AxiosError;

			console.log('[CREATE-PREMIUM-SUBSCRIPTION-PAYMENT-ERROR]', _error);

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
						animationData={CreditCardAnimation}
					/>
				</div>
			</div>
		</div>
	);
};

export default VerifyPremiumSubscriptionPaymentModal;
