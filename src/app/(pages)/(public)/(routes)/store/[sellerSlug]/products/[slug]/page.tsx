'use client';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {Fragment, useEffect, useState} from 'react';
import Footer from '@/components/navigation/footer';
import {usePathname, useRouter} from 'next/navigation';
import {getProductIdFromSlug} from '@/utils/slug.formatter';
import MainNavbar from '@/components/navigation/main-nav-bar';
import LoadingAnimationOne from '@/components/loader/loading-animation-one';
import SingleProductContent from '@/components/product/single-product-content';
import ProductMediaModal from '@/components/modals/product/product-media-modal';
import EmptyAnimation from '../../../../../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../../../../../public/animations/animation__3.json';
import StoreSingleProductContent from '@/components/product/store-single-product-content';

interface ProductPageParams {
	params: {
		slug: string;
	};
}

type Tab = 'Seller Info' | 'Review' | 'More From Seller';

const MarketPlaceProductPage = ({params: {slug}}: ProductPageParams) => {
	const router = useRouter();
	const pathName = usePathname();

	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);

	const {
		user,
		product,
		updatePayload,
		productInfo,
		updateProductInfo,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState<Tab>('Seller Info');

	const fetchProduct = async () => {
		try {
			setLoading(true);

			const [_product, _productInfo] = await Promise.all([
				axios.get(
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/product/${getProductIdFromSlug(slug)}`
				),
				axios.get(
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/info/${getProductIdFromSlug(slug)}`
				),
			]);

			updatePayload(_product.data.data);
			updateProductInfo(_productInfo.data.data);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;
		}
	};

	const viewProduct = async () => {
		try {
			axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/product/${getProductIdFromSlug(slug)}/view`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	useEffect(() => {
		if (user) {
			viewProduct();
		}
	}, [user]);

	const handleLikeUnlikeProduct = async (formData: {value?: boolean}) => {
		try {
			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/like-unlike-product?productId=${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePayload(data.data);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	const handleAddUserToCallSeller = async () => {
		try {
			if (!user)
				return router.push(`/signin?redirect_to=${pathName.slice(1)}`);

			axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-user-to-call-seller?product=${product?.id}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			const telLink = document.createElement('a');

			telLink.href = `tel:${productInfo?.phoneNumber}`;

			telLink.target = '_blank';

			telLink.click();
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	const handleMessageSeller = async () => {
		try {
			if (!user)
				return router.push(`/signin?redirect_to=${pathName?.slice(1)}`);

			if (loading) return;

			if (user?.id === product?.user.toString()) return;

			await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-user-to-contact-seller?product=${product?.id}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${product?.user}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updateChatConversation(data.data);

			router.push('/account');

			updateCurrentAccountTab('Messages');

			updateShowChatConversation(true);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	return (
		<Fragment>
			<MainNavbar />
			<main className='w-full relative'>
				{isProductMediaModalOpen && <ProductMediaModal />}

				<section className='sm:h-[35vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 pb-20 sm:pb-0 md:pt-0'>
					<h1 className='text-xl md:text-5xl font-medium text-white capitalize px-6 sm:px-0 text-center'>
						{product?.name}
					</h1>
				</section>

				{loading && (
					<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
						<LoadingAnimationOne />
					</div>
				)}

				{!loading && !product && (
					<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
						<div className='h-[200px] w-1/2 mx-auto bg-white'>
							<Lottie
								loop={true}
								className='h-full'
								animationData={EmptyAnimation}
							/>
						</div>
					</div>
				)}

				{!loading && product && (
					<StoreSingleProductContent
						loading={loading}
						product={product}
						currentTab={currentTab}
						productInfo={productInfo}
						setCurrentTab={setCurrentTab}
						handleMessageSeller={handleMessageSeller}
						handleLikeUnlikeProduct={handleLikeUnlikeProduct}
						handleAddUserToCallSeller={handleAddUserToCallSeller}
					/>
				)}
			</main>
			<Footer />
		</Fragment>
	);
};

export default MarketPlaceProductPage;
