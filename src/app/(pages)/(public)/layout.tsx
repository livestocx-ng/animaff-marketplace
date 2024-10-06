'use client';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useCreateBlogStore,
	useDownloadAppStore,
	useReferralModalStore,
	useShareProductModalStore,
	useUpdateUserRoleModalStore,
	useReadNotificationModalStore,
	useUpgradeToPremiumAccessStore,
	useUpdateVendorProfileModalStore,
	useUpdateWelcomeFarmerModalStore,
	useUpdateSearchLocationModalStore,
	usePremiumSubscriptionSuccessModalStore,
	usePremiumSubscriptionCheckoutModalStore,
	useVerifyPremiumSubscriptionPaymentModalStore,
	useVerifyProductUploadSubscriptionPaymentModalStore,
} from '@/hooks/use-global-store';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import {useSearchParams} from 'next/navigation';
import {getLocalStorage} from '@/lib/localstorageHelper';
import CreateBlogModal from '@/components/modals/blogs/create-blog-modal';
import ShareProductModal from '@/components/modals/product/share-product-modal';
import WelcomeFarmerModal from '@/components/modals/welcome/welcome-farmer-modal';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import UserReferralModal from '@/components/modals/referrals/user-referral-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';
import UpgradeToPremiumModal from '@/components/modals/premium/upgrade-to-premium-modal';
import DownloadMobileAppModal from '@/components/modals/welcome/download-mobile-app-modal';
import UpdateVendorProfileModal from '@/components/modals/user/update-vendor-profile-modal';
import UpdateSearchLocationModal from '@/components/modals/utils/update-search-location-modal';
import PremiumSubscriptionSuccessModal from '@/components/modals/premium/premium-subscription-success-modal';
import PremiumSubscriptionCheckoutModal from '@/components/modals/premium/premium-subscription-checkout-modal';
import VerifyPremiumSubscriptionPaymentModal from '@/components/modals/premium/verify-premium-subscription-payment-modal';
import VerifyProductUploadSubscriptionPaymentModal from '@/components/modals/premium/verify-product-upload-subscription-payment-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const {user} = useUserHook();
	const queryParams = useSearchParams();
	const paymentFor = queryParams.get('paymentFor');
	const transactionRef = queryParams.get('transactionRef');
	const transactionStatus = queryParams.get('transactionStatus');

	const {
		updateBlogs,
		updateVendorProfile,
		updatePromotionPlans,
		updateChatConversations,
		updateUserPromotionPlan,
		updateUserPremiumSubscription,
		updatePremiumSubscriptionPlans,
		updateUserProductUploadSubscription,
		updateProductUploadSubscriptionPlans,
	} = useGlobalStore();

	const createBlogModal = useCreateBlogStore();
	const referralModal = useReferralModalStore();
	const downloadAppModal = useDownloadAppStore();
	const shareProductModal = useShareProductModalStore();
	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const welcomeFarmerModal = useUpdateWelcomeFarmerModalStore();
	const updateVendorProfileModal = useUpdateVendorProfileModalStore();
	const upgradeToPremiumAccessModal = useUpgradeToPremiumAccessStore();
	const updateSearchLocationModal = useUpdateSearchLocationModalStore();
	const premiumSubscriptionSuccessModal =
		usePremiumSubscriptionSuccessModalStore();
	const premiumSubscriptionCheckoutModal =
		usePremiumSubscriptionCheckoutModalStore();
	const verifyPremiumSubscriptionPaymentModal =
		useVerifyPremiumSubscriptionPaymentModalStore();
	const verifyProductUploadPaymentModal =
		useVerifyProductUploadSubscriptionPaymentModalStore();

	const initializeUserReferralModal = () => {
		const referralModalConsent = getLocalStorage('animaff_referral_banner');

		if (
			referralModalConsent === null ||
			referralModalConsent === undefined
		) {
			setTimeout(() => {
				referralModal.onOpen();
			}, 6500);
		}
	};

	const initializeDownloadAppModal = () => {
		setTimeout(() => {
			downloadAppModal.onOpen();
		}, 6500);
	};

	useEffect(() => {
		fetchBlogs();
		initializeDownloadAppModal();
	}, []);

	useEffect(() => {
		if (
			user &&
			user?.role === 'FARMER' &&
			user?.isVendorProfileUpdated === false
		) {
			updateVendorProfileModal.onOpen();
		}

		if (user) {
			initializeUserReferralModal();
		}

		fetchChatConversations();
		fetchUserSubscriptions();
		fetchSubscriptionPlans();
	}, [user]);

	useEffect(() => {
		if (
			paymentFor === 'product_upload' &&
			transactionRef !== '' &&
			transactionStatus !== ''
		) {
			if (verifyProductUploadPaymentModal.isOpen) return;

			verifyProductUploadPaymentModal.onOpen();
		}
		if (
			paymentFor === 'premium_subscription' &&
			transactionRef !== '' &&
			transactionStatus !== ''
		) {
			if (verifyPremiumSubscriptionPaymentModal.isOpen) return;

			verifyPremiumSubscriptionPaymentModal.onOpen();
		}
	}, [paymentFor]);

	const fetchBlogs = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/blog/fetch-all`,
			);

			// console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateBlogs(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-BLOGS-ERROR] :: ', _error);
		}
	};

	const fetchChatConversations = async () => {
		try {
			if (!user) {
				return;
			}

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations?page=1`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateChatConversations(data.data.conversations);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchUserSubscriptions = async () => {
		try {
			if (!user) {
				return;
			}

			const [
				vendorProfileRequest,
				userPromotionPlanRequest,
				userPremiumSubscriptionPlansRequest,
				userProductUploadSubscriptionPlansRequest,
			] = await Promise.all([
				axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`, {
					headers: {
						Authorization: user?.accessToken,
					},
				}),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/promotions/plan`,
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription`,
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/product-upload-subscription`,
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				),
			]);

			updateVendorProfile(vendorProfileRequest.data.data);

			updateUserPromotionPlan(userPromotionPlanRequest.data.data);

			updateUserPremiumSubscription(
				userPremiumSubscriptionPlansRequest.data.data
			);

			updateUserProductUploadSubscription(
				userProductUploadSubscriptionPlansRequest.data.data
			);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	const fetchSubscriptionPlans = async () => {
		try {
			const [
				promotionPlansRequest,
				premiumSubscriptionPlansRequest,
				userProductUploadSubscriptionRequest,
			] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/promotions/plans`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-plans`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/product-upload-subscription-plans`
				),
			]);

			updatePromotionPlans(promotionPlansRequest.data.data);

			updatePremiumSubscriptionPlans(
				premiumSubscriptionPlansRequest.data.data
			);

			updateProductUploadSubscriptionPlans(
				userProductUploadSubscriptionRequest.data.data
			);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	return (
		<div className='relative'>
			{createBlogModal.isOpen && <CreateBlogModal />}
			{referralModal.isOpen && <UserReferralModal />}
			{shareProductModal.isOpen && <ShareProductModal />}
			{welcomeFarmerModal.isOpen && <WelcomeFarmerModal />}
			{/* {downloadAppModal.isOpen && <DownloadMobileAppModal />} */}
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{upgradeToPremiumAccessModal.isOpen && <UpgradeToPremiumModal />}
			{updateSearchLocationModal.isOpen && <UpdateSearchLocationModal />}
			{premiumSubscriptionCheckoutModal.isOpen && (
				<PremiumSubscriptionCheckoutModal />
			)}
			{verifyPremiumSubscriptionPaymentModal.isOpen && (
				<VerifyPremiumSubscriptionPaymentModal
					transactionRef={transactionRef!}
					transactionStatus={transactionStatus!}
				/>
			)}
			{verifyProductUploadPaymentModal.isOpen && (
				<VerifyProductUploadSubscriptionPaymentModal
					transactionRef={transactionRef!}
					transactionStatus={transactionStatus!}
				/>
			)}
			{premiumSubscriptionSuccessModal.isOpen && (
				<PremiumSubscriptionSuccessModal />
			)}

			{/* {updateVendorProfileModal.isOpen && <UpdateVendorProfileModal />} */}

			{children}
		</div>
	);
};

export default PagesLayout;
