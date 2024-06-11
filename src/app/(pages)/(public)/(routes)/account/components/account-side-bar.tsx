'use client';
import {
	Heart,
	LogOut,
	Package,
	Settings,
	RefreshCcw,
	UserSquare,
	ShoppingCartIcon,
	Bell,
	Mails,
	Megaphone,
	ShoppingCart,
	LineChart,
} from 'lucide-react';
import axios from 'axios';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import {Tab} from '@/types/types';
import {toast} from 'react-hot-toast';
import {signOut} from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';
import {useGlobalStore} from '@/hooks/use-global-store';

interface AccountSideBarProps {}

const CustomerTabs: Tab[] = [
	'Account',
	// 'Desired Items',
	'Messages',
	'Notifications',
	'Settings',
	'Logout',
];

const FarmerTabs: Tab[] = [
	'Account',
	'Products',
	'Promotions',
	'Messages',
	'Notifications',
	'Settings',
	'Logout',
];

const AdminTabs: Tab[] = [
	'Account',
	'Messages',
	'Notifications',
	'Settings',
	'Logout',
];

const AccountSideBar = ({}: AccountSideBarProps) => {
	const router = useRouter();
	const {user, updateUser, currentAccountTab, updateCurrentAccountTab} =
		useGlobalStore();

	const handleTabClick = async (tab: Tab) => {
		if (tab !== 'Logout') {
			updateCurrentAccountTab(tab);
		} else {
			try {
				// await signOut();

				await axios.get('/api/auth/signout');

				toast.success('Logged out!');

				updateUser(null);

				router.push('/');

				// window.location.reload();
			} catch (error) {
				// console.log('[LOGOUT-ERROR] :: ', error);
				toast.error('Error!');
			}
		}
	};

	// console.log(user?.role);

	return (
		<div className='hidden w-[20%] md:flex flex-col pt-3 border rounded'>
			<h1 className='font-semibold px-4'>Navigation</h1>

			{user && user?.role === 'CUSTOMER' && (
				<ul className='space-y- mt-5'>
					{CustomerTabs.map((tab) => (
						<li
							key={tab}
							onClick={() => handleTabClick(tab)}
							className={cn(
								`cursor-pointer flex items-center space-x-3 py-4 px-4`,
								currentAccountTab === tab
									? 'bg-slate-100 border-l-4 border-l-green-500'
									: 'text-gray-500',
								tab === 'Logout'
									? 'rounded-bl hover:border-l-4 border-l-red-500 hover:border-l-red-500 hover:text-red-400'
									: ''
							)}
						>
							{tab === 'Account' && (
								<UserSquare
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{/* {tab === 'Desired Items' && (
								<ShoppingCart
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)} */}
							{tab === 'Messages' && (
								<Mails
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Notifications' && (
								<Bell
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Settings' && (
								<Settings
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Logout' && (
								<LogOut
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										tab === 'Logout' &&
										'text-red-600'
									}`}
								/>
							)}
							<p
								className={cn(
									'text-xs',
									currentAccountTab === tab
										? 'text-black'
										: 'text-gray-500'
								)}
							>
								{tab}
							</p>
						</li>
					))}
				</ul>
			)}

			{user && user?.role === 'FARMER' && (
				<ul className='space-y- mt-5'>
					{FarmerTabs.map((tab) => (
						<li
							key={tab}
							onClick={() => handleTabClick(tab)}
							className={cn(
								`cursor-pointer flex items-center space-x-3 py-4 px-4`,
								currentAccountTab === tab
									? 'bg-slate-100 border-l-4 border-l-green-500'
									: 'text-gray-500',
								tab === 'Logout'
									? 'rounded-bl hover:border-l-4 border-l-red-500 hover:border-l-red-500 hover:text-red-400'
									: ''
							)}
						>
							{tab === 'Account' && (
								<UserSquare
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Products' && (
								<Package
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Promotions' && (
								<LineChart
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Messages' && (
								<Mails
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Notifications' && (
								<Bell
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Settings' && (
								<Settings
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Logout' && (
								<LogOut
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										tab === 'Logout' &&
										'text-red-600'
									}`}
								/>
							)}

							<p
								className={cn(
									'text-xs',
									currentAccountTab === tab
										? 'text-black'
										: 'text-gray-500'
								)}
							>
								{tab}
							</p>
						</li>
					))}
				</ul>
			)}
			
			{user && user?.role === 'ADMIN' && (
				<ul className='space-y- mt-5'>
					{AdminTabs.map((tab) => (
						<li
							key={tab}
							onClick={() => handleTabClick(tab)}
							className={cn(
								`cursor-pointer flex items-center space-x-3 py-4 px-4`,
								currentAccountTab === tab
									? 'bg-slate-100 border-l-4 border-l-green-500'
									: 'text-gray-500',
								tab === 'Logout'
									? 'rounded-bl hover:border-l-4 border-l-red-500 hover:border-l-red-500 hover:text-red-400'
									: ''
							)}
						>
							{tab === 'Account' && (
								<UserSquare
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							
							{tab === 'Messages' && (
								<Mails
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Notifications' && (
								<Bell
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}

							{tab === 'Settings' && (
								<Settings
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										'text-green-600'
									}`}
								/>
							)}
							{tab === 'Logout' && (
								<LogOut
									className={`h-6 w-6 ${
										currentAccountTab == tab &&
										tab === 'Logout' &&
										'text-red-600'
									}`}
								/>
							)}

							<p
								className={cn(
									'text-xs',
									currentAccountTab === tab
										? 'text-black'
										: 'text-gray-500'
								)}
							>
								{tab}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AccountSideBar;
