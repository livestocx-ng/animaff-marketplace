'use client';
import {
	useGlobalStore,
	useCreateProductModalStore,
	useDeleteProductModalStore,
	useUpdateProductModalStore,
	useCreatePromotionModalStore,
	useShareNewProductModalStore,
	useProductUploadSubscriptionModalStore,
	useVerifyProductUploadSubscriptionPaymentModalStore,
} from '@/hooks/use-global-store';
import {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import {redirect, useSearchParams} from 'next/navigation';
import AddProductModal from '@/components/modals/product/add-product-modal';
import UpdateProductModal from '@/components/modals/product/update-product-modal';
import DeleteProductModal from '@/components/modals/product/delete-product-modal';
import ShareNewProductModal from '@/components/modals/product/share-new-product-modal';
import CreatePromotionModal from '@/components/modals/promotions/create-promotion-modal';
import ProductUploadSubscriptionModal from '@/components/modals/premium/product-upload-subscription-modal';

interface AccountLayoutProps {
	children: React.ReactNode;
}

export default function AccountLayout({children}: AccountLayoutProps) {
	const queryParams = useSearchParams();

	const {user, error} = useUserHook();
	const {updateChatConversations} = useGlobalStore();

	const isCreatePromotionModalOpen = useCreatePromotionModalStore(
		(state) => state.isOpen
	);
	const isProductUploadSubscriptionModalOpen =
		useProductUploadSubscriptionModalStore((state) => state.isOpen);
	const isCreateProductModalOpen = useCreateProductModalStore(
		(state) => state.isOpen
	);
	const isShareNewProductModalOpen = useShareNewProductModalStore(
		(state) => state.isOpen
	);
	const isUpdateProductModalOpen = useUpdateProductModalStore(
		(state) => state.isOpen
	);
	const isDeleteProductModalOpen = useDeleteProductModalStore(
		(state) => state.isOpen
	);
	const verifyProductUploadPaymentModal =
		useVerifyProductUploadSubscriptionPaymentModalStore();

	if (error && !user) {
		redirect('/');
	}

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

	useEffect(() => {
		fetchChatConversations();
	}, [user]);

	if (user) {
		return (
			<div className='relative'>
				{' '}
				{isCreateProductModalOpen && <AddProductModal />}
				{isUpdateProductModalOpen && <UpdateProductModal />}
				{isDeleteProductModalOpen && <DeleteProductModal />}
				{isCreatePromotionModalOpen && <CreatePromotionModal />}
				{isShareNewProductModalOpen && <ShareNewProductModal />}
				{isProductUploadSubscriptionModalOpen && (
					<ProductUploadSubscriptionModal />
				)}

				{children}
			</div>
		);
	}
}
