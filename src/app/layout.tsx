import ReactGA from 'react-ga4';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';

import './globals.css';
import Head from 'next/head';
import {ToastProvider} from '@/providers';
import AuthProvider from '@/providers/auth-provider';
import CookieBannerProvider from '@/providers/cookie-banner-provider';
import SocketProvider from '@/providers/socket-provider';
import ReferralProvider from '@/providers/referral-provider';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
});

// Initialize Google Analytics
// ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '');

export const metadata: Metadata = {
	title: 'Animaff - Best deals, Everything Animals',
	description: 'Best deals, Everything Animals',
	keywords: ['Pets', 'Livestock', 'Animals', 'Meat'],
	openGraph: {
		images: [
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
		],
	},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<AuthProvider>
					<SocketProvider>
						<ToastProvider />
						<Toaster />
						{children}
					</SocketProvider>
				</AuthProvider>

				<ReferralProvider />
				<CookieBannerProvider />
			</body>
		</html>
	);
}
