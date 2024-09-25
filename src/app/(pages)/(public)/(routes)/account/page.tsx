'use client';
import {Fragment} from 'react';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import Footer from '@/components/navigation/footer';
import AccountSideBar from './components/account-side-bar';
import MainNavbar from '@/components/navigation/main-nav-bar';
import ProductContent from './components/dashboard/product-content';
import ProductsContent from './components/dashboard/products-content';
import SettingsContent from './components/dashboard/settings-content';
import MessagesContent from './components/dashboard/messages-content';
import MobileAccountSideBar from './components/mobile-account-sidebar';
import DashboardContent from './components/dashboard/dashboard-content';
import PromotionsContent from './components/dashboard/promotions-content';
import ProductMediaModal from '@/components/modals/product/product-media-modal';
import NotificationsContent from './components/dashboard/notifications-content';

const AccountPage = () => {
	const {currentAccountTab} = useGlobalStore();

	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);

	return (
		<Fragment>
			<MainNavbar />
			<div className='w-full relative'>
				{isProductMediaModalOpen && <ProductMediaModal />}

				<section className='h-[28vh] sm:h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
					{currentAccountTab === 'Products' ? (
						<div className='flex flex-col justify-center items-center text-center space-y-2 text-white px-4 sm:px-10'>
							<h1 className='text-xl md:text-5xl font-medium'>
								{currentAccountTab}
							</h1>
							<p className='text-xs sm:text-sm'>
								New users get 1 free Ad post which expires at
								the end of every month and renews at $3/month.
							</p>
						</div>
					) : (
						<h1 className='text-xl md:text-5xl font-medium text-white'>
							{currentAccountTab}
						</h1>
					)}
				</section>

				<div className='w-full flex flex-col justify-center items-center py-10 md:py-10 px-4 sm:px-10'>
					<div className='flex w-full'>
						<MobileAccountSideBar />
					</div>

					<div className='flex items-start justify-between w-full'>
						<AccountSideBar />

						{currentAccountTab === 'Account' && (
							<DashboardContent />
						)}

						{currentAccountTab === 'Products' && (
							<ProductsContent />
						)}

						{currentAccountTab === 'Product' && <ProductContent />}

						{/* {currentAccountTab === 'Promotions' && (
						<PromotionsContent />
					)} */}

						{currentAccountTab === 'Messages' && (
							<MessagesContent />
						)}

						{currentAccountTab === 'Notifications' && (
							<NotificationsContent />
						)}

						{currentAccountTab === 'Settings' && (
							<SettingsContent />
						)}
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default AccountPage;
