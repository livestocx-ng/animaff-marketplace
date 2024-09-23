'use client';
import {
	Bell,
	User2,
	Mails,
	Store,
	Package,
	Settings,
	Megaphone,
	LogOutIcon,
	ShoppingCart,
	MessageCircle,
	MessagesSquare,
	Users,
} from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {NavLinks} from '@/data';
import {
	useGlobalStore,
	useReferralModalStore,
	useUpdateUserRoleModalStore,
} from '@/hooks/use-global-store';
import {Button} from '../ui/button';
import {toast} from 'react-hot-toast';
import {useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {checkProductUploadSubscriptionExpiration} from '@/utils';

const MainNavbar = () => {
	const router = useRouter();
	const pathName = usePathname();

	const {
		user,
		updateUser,
		vendorProfile,
		chatConversations,
		updateCurrentAccountTab,
		updateChatConversations,
		userPremiumSubscription,
		userProductUploadSubscription,
		updateUserPremiumSubscription,
	} = useGlobalStore();

	const referralModal = useReferralModalStore();
	const updateUserRoleModal = useUpdateUserRoleModalStore();

	const [scrolling, setScrolling] = useState<boolean>(false);
	const [showMenu, setSetShowMenu] = useState<boolean>(false);
	const [showAccountMenu, setSetShowAccountMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setSetShowMenu(!showMenu);
	};

	const handleScrollHeight = () => {
		const scrollPosition = window.scrollY;

		if (scrollPosition > 50 && !scrolling) {
			setScrolling(true);
		} else if (scrollPosition <= 50 && scrolling) {
			setScrolling(false);
		}
	};

	useEffect(() => {
		handleScrollHeight();

		window.addEventListener('scroll', () => {
			const scrollPosition = window.scrollY;

			if (scrollPosition > 50) {
				setScrolling(true);
				// console.log('[SCROLLING]');
			} else {
				setScrolling(false);
				// console.log('[FALSE]');
			}
		});
	}, []);

	const handleReferralModal = () => {
		if (referralModal.isOpen) return;

		referralModal.onOpen();
	};

	const handleLogout = async () => {
		try {
			await axios.get('/api/auth/signout');

			toast.success('Logged out!', {className: 'text-xs sm:text-sm'});

			updateUser(null);
			updateChatConversations([]);
			setSetShowAccountMenu(false);
			updateUserPremiumSubscription(null);

			window.localStorage.removeItem('animaff_referral_banner');

			if (pathName.includes('account')) {
				router.push('/');
			}
		} catch (error) {
			toast.error('Error!', {className: 'text-xs sm:text-sm'});
		}
	};

	return (
		<div className='relative'>
			{userProductUploadSubscription &&
				checkProductUploadSubscriptionExpiration(
					userProductUploadSubscription
				).isWithinRange && (
					<div className='fixed z-[12] bg-gradient-to-r from-green-500 to-green-100 w-full py-2 flex justify-center items-center text-xs font-medium'>
						Your product upload subscription expires in{' '}
						{
							checkProductUploadSubscriptionExpiration(
								userProductUploadSubscription
							).remainingDays
						}{' '}
						days
					</div>
				)}
			<nav
				className={`w-full py-4 px-8 hidden fixed z-10 lg:flex items-center justify-between ${
					scrolling && 'bg-main backdrop-blur-sm'
				} ${
					userProductUploadSubscription &&
					checkProductUploadSubscriptionExpiration(
						userProductUploadSubscription
					).isWithinRange &&
					'mt-[29px]'
				}`}
			>
				<div className='flex items-center gap-x-8'>
					<Link href={'/'}>
						<Image
							alt='logo'
							width={25}
							height={25}
							className=''
							unoptimized={true}
							src={'/logo.svg'}
						/>
					</Link>

					{NavLinks.map((link) => (
						<Link
							href={link.url}
							key={link.title}
							className={`text-xs ${
								scrolling ? 'text-white' : 'text-white'
							}`}
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className='flex items-center space-x-5'>
					{chatConversations?.filter(
						(conversation) => conversation?.unreadMessages !== 0
					).length !== 0 && (
						<div
							onClick={() => {
								if (!user) {
									router.push(`${!user && '/signin'}`);
								} else {
									router.push('/account');

									setSetShowAccountMenu(false);

									updateCurrentAccountTab('Messages');
								}
							}}
							className={`h-8 w-8 ${
								scrolling ? 'bg-white' : 'bg-main'
							} rounded-full flex flex-col items-center justify-center cursor-pointer relative`}
						>
							<MessageCircle
								className={`h-4 w-4 ${
									scrolling ? 'text-main' : 'text-white'
								}`}
							/>

							<div
								className={`absolute -bottom-3 right-0 bg-red-500 rounded-full h-5 w-5 text-white font-bold text-[8px] flex items-center justify-center animate-bounce duration-1000`}
							>
								{
									chatConversations?.filter(
										(conversation) =>
											conversation?.unreadMessages !== 0
									).length
								}
							</div>
						</div>
					)}

					{userPremiumSubscription && user?.role === 'FARMER' && (
						<Link
							target='_blank'
							href={`/store/${vendorProfile?.slug}`}
							className={`h-8 w-8 ${
								scrolling
									? 'bg-white'
									: 'bg-main shadow-sm shadow-slate-400'
							} rounded-full flex flex-col items-center justify-center relative cursor-pointer`}
						>
							<Store
								className={`h-4 w-4 ${
									scrolling
										? 'text-main'
										: 'text-white cursor-pointer'
								}`}
							/>
						</Link>
					)}

					<div
						onClick={() => {
							if (!user) {
								if (pathName.length > 1) {
									router.push(
										`/signin?redirect_to=${pathName.slice(
											1
										)}`
									);
								} else {
									router.push('/signin');
								}
							} else {
								setSetShowAccountMenu(!showAccountMenu);
							}
						}}
						className={`h-8 w-8 ${
							scrolling
								? 'bg-white'
								: 'bg-main shadow-sm shadow-slate-400'
						} rounded-full flex flex-col items-center justify-center relative cursor-pointer`}
					>
						<User2
							className={`h-4 w-4 ${
								scrolling
									? 'text-main'
									: 'text-white cursor-pointer'
							}`}
						/>

						{showAccountMenu && (
							<div
								onMouseLeave={() =>
									setSetShowAccountMenu(false)
								}
								className='absolute right-0 top-12 w-[200px] rounded shadow-md bg-white flex flex-col space-y-6 items-start px-4 py-5'
							>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Account');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<User2 className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Account</p>
								</Link>
								<div
									onClick={handleReferralModal}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Users className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Referrals</p>
								</div>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Messages');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<MessagesSquare
										className={`h-5 w-5 text-main`}
									/>

									<p className='text-xs'>Messages</p>
								</Link>

								{user?.role === 'FARMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											updateCurrentAccountTab('Products');
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<Package
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Products</p>
									</Link>
								)}
								{user?.role === 'FARMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											updateCurrentAccountTab(
												'Promotions'
											);
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<Megaphone
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Promotions</p>
									</Link>
								)}
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Messages');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Mails className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Messages</p>
								</Link>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab(
											'Notifications'
										);
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Bell className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Notifications</p>
								</Link>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Settings');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Settings className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Settings</p>
								</Link>
								<p
									// href={'#'}
									onClick={handleLogout}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} pt-10 rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in cursor-pointer`}
								>
									<LogOutIcon
										className={`h-5 w-5 text-red-500`}
									/>

									<p className='text-xs text-red-500'>
										Logout
									</p>
								</p>
							</div>
						)}
					</div>

					<div
						onClick={() => {
							if (!user) {
								router.push(`/signup?seller=true`);
							}

							if (user && user?.role === 'CUSTOMER') {
								updateUserRoleModal.onOpen();
							}

							if (user && user?.role === 'FARMER') {
								updateCurrentAccountTab('Products');

								router.push('/account');
							}
						}}
						className={`h-8 bg-orange-400 rounded-sm w-[80px] text-white text-xs flex flex-col items-center justify-center cursor-pointer`}
					>
						Sell
					</div>

					{/* {!userPremiumSubscription && (
						<div
							onClick={() => {
								upgradeToPremiumAccessModal.onOpen();
							}}
							className={`h-8 bg-blue-600 border border-[#ffffff80] hover:border-white px-4 rounded-sm text-white text-xs flex items-center justify-center space-x-2 cursor-pointer`}
						>
							<ZapIcon size={14} />
							<p>Pro Access</p>
						</div>
					)} */}
				</div>
			</nav>

			{/* MOBILE TOGGLE-BAR */}
			<div
				className={`w-full py-1 px-4 pl-1 lg:pl-8 lg:px-8 lg:hidden fixed z-10 flex items-center justify-between ${
					scrolling && 'bg-main backdrop-blur-sm'
				}  ${
					userProductUploadSubscription &&
					checkProductUploadSubscriptionExpiration(
						userProductUploadSubscription
					).isWithinRange &&
					'mt-[29px]'
				}`}
			>
				<Button
					type='button'
					variant={'default'}
					className={`font-bold bg-[#0000000] hover:bg-[#0000000]`}
					onClick={toggleMenu}
				>
					<Image
						alt='menu_icon'
						width={30}
						height={30}
						unoptimized={true}
						src={`${
							!scrolling
								? '/icon_menu.svg'
								: '/icon_menu_white.svg'
						}`}
					/>
				</Button>

				<div className='flex items-center space-x-2'>
					<div
						onClick={() => {
							if (!user) {
								router.push(`/signup?seller=true`);
							}

							if (user && user?.role === 'CUSTOMER') {
								updateUserRoleModal.onOpen();
							}

							if (user && user?.role === 'FARMER') {
								updateCurrentAccountTab('Products');

								router.push('/account');
							}
						}}
						className={`h-8 bg-orange-400 rounded-sm w-[60px] text-white text-xs flex flex-col items-center justify-center cursor-pointer`}
					>
						Sell
					</div>

					{/* {!userPremiumSubscription && (
						<div
							onClick={() => {
								upgradeToPremiumAccessModal.onOpen();
							}}
							className={`h-8 bg-blue-600 px-2 rounded-sm text-white text-xs flex items-center justify-center space-x-2 cursor-pointer`}
						>
							<ZapIcon size={14} />
							<p>Pro Access</p>
						</div>
					)} */}

					{chatConversations?.filter(
						(conversation) => conversation?.unreadMessages !== 0
					).length !== 0 && (
						<div
							onClick={() => {
								if (!user) {
									router.push(`${!user && '/signin'}`);
								} else {
									router.push('/account');

									setSetShowAccountMenu(false);

									updateCurrentAccountTab('Messages');
								}
							}}
							className={`h-8 w-8 ${
								scrolling ? 'bg-white' : 'bg-main'
							} rounded-full flex flex-col items-center justify-center cursor-pointer relative`}
						>
							<MessageCircle
								className={`h-3 w-3 ${
									scrolling ? 'text-main' : 'text-white'
								}`}
							/>

							<div
								className={`absolute -bottom-3 right-0 bg-red-500 rounded-full h-5 w-5 text-white font-bold text-[8px] flex items-center justify-center animate-bounce duration-1000`}
							>
								{
									chatConversations?.filter(
										(conversation) =>
											conversation?.unreadMessages !== 0
									).length
								}
							</div>
						</div>
					)}

					{userPremiumSubscription && user?.role === 'FARMER' && (
						<Link
							target='_blank'
							href={`/store/${vendorProfile?.slug}`}
							className={`h-8 w-8 ${
								scrolling
									? 'bg-white'
									: 'bg-main shadow-sm shadow-slate-400'
							} rounded-full flex flex-col items-center justify-center relative cursor-pointer`}
						>
							<Store
								className={`h-4 w-4 ${
									scrolling
										? 'text-main'
										: 'text-white cursor-pointer'
								}`}
							/>
						</Link>
					)}

					<div
						onClick={() => {
							if (!user) {
								if (pathName.length > 1) {
									router.push(
										`/signin?redirect_to=${pathName.slice(
											1
										)}`
									);
								} else {
									router.push('/signin');
								}
							} else {
								setSetShowAccountMenu(!showAccountMenu);
							}
						}}
						className={`h-8 w-8 ${
							scrolling
								? 'bg-white'
								: 'bg-main shadow-sm shadow-slate-400'
						} rounded-full flex flex-col items-center justify-center relative cursor-pointer`}
					>
						<User2
							className={`h-3 w-3 ${
								scrolling
									? 'text-main'
									: 'text-white cursor-pointer'
							}`}
						/>

						{showAccountMenu && (
							<div
								onMouseLeave={() =>
									setSetShowAccountMenu(false)
								}
								className='absolute right-0 top-12 w-[200px] rounded shadow-md bg-white flex flex-col space-y-6 items-start px-4 py-5'
							>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Account');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<User2 className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Account</p>
								</Link>
								<div
									onClick={handleReferralModal}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Users className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Referrals</p>
								</div>
								{user?.role === 'CUSTOMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											router.push('/account');

											updateCurrentAccountTab(
												'Desired Items'
											);
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<ShoppingCart
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Desired Items</p>
									</Link>
								)}
								{user?.role === 'FARMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											updateCurrentAccountTab('Products');
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<Package
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Products</p>
									</Link>
								)}
								{user?.role === 'FARMER' && (
									<Link
										href={'/account'}
										onClick={() => {
											setSetShowAccountMenu(false);

											updateCurrentAccountTab(
												'Promotions'
											);
										}}
										className={` ${
											scrolling ? 'bg-white' : 'bg-mai'
										} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
									>
										<Megaphone
											className={`h-5 w-5 text-main`}
										/>

										<p className='text-xs'>Promotions</p>
									</Link>
								)}
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Messages');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Mails className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Messages</p>
								</Link>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab(
											'Notifications'
										);
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Bell className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Notifications</p>
								</Link>
								<Link
									href={'/account'}
									onClick={() => {
										setSetShowAccountMenu(false);

										updateCurrentAccountTab('Settings');
									}}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in`}
								>
									<Settings className={`h-5 w-5 text-main`} />

									<p className='text-xs'>Settings</p>
								</Link>
								<p
									onClick={handleLogout}
									className={` ${
										scrolling ? 'bg-white' : 'bg-mai'
									} pt-10 rounded-full flex items-center space-x-4 hover:translate-x-1 transition-all duration-500 ease-in cursor-pointer`}
								>
									<LogOutIcon
										className={`h-5 w-5 text-red-500`}
									/>

									<p className='text-xs text-red-500'>
										Logout
									</p>
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* MOBILE SIDEBAR */}
			<nav
				style={{
					boxShadow: 'rgba(100, 100, 111, 0.8) 0px 7px 29px 0px;',
				}}
				className={` ${
					showMenu ? 'flex' : 'hidden'
				} py-2 px-8 absolute top-0 left-0 h-screen w-[400px] z-10 sm:hidden flex-col items-start gap-y-10 bg-white backdrop-blur-sm`}
			>
				<div className={`flex items-center justify-between w-full`}>
					<Link href={'/'} onClick={toggleMenu}>
						<Image
							alt='logo'
							width={30}
							height={30}
							className=''
							unoptimized={true}
							src={'/logo.svg'}
						/>
					</Link>
					<Button
						type='button'
						variant={'outline'}
						onClick={toggleMenu}
						className='border-0 font-bold'
					>
						x
					</Button>
				</div>

				<div className='flex flex-col items-start gap-y-12'>
					{NavLinks.map((link) => (
						<Link
							href={link.url}
							key={link.title}
							onClick={toggleMenu}
							className={`text-sm `}
						>
							{link.title}
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
};

export default MainNavbar;
