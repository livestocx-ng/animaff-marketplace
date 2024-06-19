'use client';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useDownloadAppStore,
	useShareProductModalStore,
	useUpdateUserRoleModalStore,
	useReadNotificationModalStore,
	useUpdateVendorProfileModalStore,
	useUpdateSearchLocationModalStore,
	useUpgradeToPremiumAccessStore,
	useUpdateWelcomeFarmerModalStore,
} from '@/hooks/use-global-store';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import ShareProductModal from '@/components/modals/product/share-product-modal';
import WelcomeFarmerModal from '@/components/modals/welcome/welcome-farmer-modal';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';
import UpgradeToPremiumModal from '@/components/modals/premium/upgrade-to-premium-modal';
import DownloadMobileAppModal from '@/components/modals/welcome/download-mobile-app-modal';
import UpdateVendorProfileModal from '@/components/modals/user/update-vendor-profile-modal';
import UpdateSearchLocationModal from '@/components/modals/utils/update-search-location-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const {user} = useUserHook();

	const {
		updatePromotionPlans,
		updateChatConversations,
		updateUserPromotionPlan,
		updateUserPremiumSubscription,
		updatePremiumSubscriptionPlans,
		updateUserProductUploadSubscription,
		updateProductUploadSubscriptionPlans,
	} = useGlobalStore();

	const downloadAppModal = useDownloadAppStore();
	const shareProductModal = useShareProductModalStore();
	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const welcomeFarmerModal = useUpdateWelcomeFarmerModalStore();
	const updateVendorProfileModal = useUpdateVendorProfileModalStore();
	const upgradeToPremiumAccessModal = useUpgradeToPremiumAccessStore();
	const updateSearchLocationModal = useUpdateSearchLocationModalStore();

	const initializeDownloadAppModal = () => {
		setTimeout(() => {
			downloadAppModal.onOpen();
		}, 6500);
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
				userPromotionPlanRequest,
				userPremiumSubscriptionPlansRequest,
				userProductUploadSubscriptionPlansRequest,
			] = await Promise.all([
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

			console.log(userProductUploadSubscriptionRequest);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		initializeDownloadAppModal();
	}, []);

	useEffect(() => {
		if (
			user &&
			user?.role === 'FARMER' &&
			user?.isVendorProfileUpdated === false
		) {
			// router.push('/compliance');
			updateVendorProfileModal.onOpen();
		}

		fetchChatConversations();
		fetchUserSubscriptions();
		fetchSubscriptionPlans();
	}, [user]);

	return (
		<div className='relative'>
			{shareProductModal.isOpen && <ShareProductModal />}
			{welcomeFarmerModal.isOpen && <WelcomeFarmerModal />}
			{downloadAppModal.isOpen && <DownloadMobileAppModal />}
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{upgradeToPremiumAccessModal.isOpen && <UpgradeToPremiumModal />}
			{updateSearchLocationModal.isOpen && <UpdateSearchLocationModal />}
			{updateVendorProfileModal.isOpen && <UpdateVendorProfileModal />}

			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
