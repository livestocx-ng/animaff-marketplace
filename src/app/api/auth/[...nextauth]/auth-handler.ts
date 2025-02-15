import axios from 'axios';
import {cookies} from 'next/headers';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import {COOKIE_MAX_AGE, COOKIE_NAME} from '@/lib/constants';

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET ?? '',
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET ?? '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'online',
				},
			},
		}),
	],
	callbacks: {
		async signIn({account, profile}) {
			if (account?.provider === 'google') {
				// console.log('[GOOGLE-SIGNIN-SUCCESS]');
				// console.log(`[USER] :: `, profile);

				try {
					const {data} = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signin`,
						{email: profile?.email}
					);

					// // console.log('[DATA] :: ', data.data);
					const cookieStore = await cookies();

					// Set the cookie
					cookieStore.set(
						COOKIE_NAME,
						JSON.stringify({
							...data.data.user,
							accessToken: data?.data?.accessToken,
							refreshToken: data?.data?.refreshToken,
						}),
						{
							httpOnly: true,
							maxAge: COOKIE_MAX_AGE,
							path: '/',
							sameSite: 'strict',
							secure: process.env.NODE_ENV === 'production',
						}
					);

					// cookies().set({
					// 	name: COOKIE_NAME,
					// 	value: JSON.stringify({
					// 		...data.data.user,
					// 		accessToken: data?.data?.accessToken,
					// 		refreshToken: data?.data?.refreshToken,
					// 	}),
					// 	httpOnly: true,
					// 	maxAge: COOKIE_MAX_AGE,
					// 	path: '/',
					// 	sameSite: 'strict',
					// 	secure: process.env.NODE_ENV === 'production',
					// });

					return Promise.resolve('/');
				} catch (error) {
					// console.error('[GOOGLE-SIGIN-API-ERROR]', error);
				}
			}

			// return profile?.email && profile?.email.endsWith("@example.com")

			return true; // Do different verification for other providers that don't have `email`
		},
	},
});

export default handler;
