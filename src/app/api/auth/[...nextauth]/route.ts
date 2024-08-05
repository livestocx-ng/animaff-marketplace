import axios from 'axios';
import {cookies} from 'next/headers';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import {COOKIE_MAX_AGE, COOKIE_NAME} from '@/lib/constants';

const handler = NextAuth({
	// secret: process.env.NEXTAUTH_SECRET,
	secret: "e7RfVQKBgDWkW60bMGJYwj4RJQNSW+le+0XVAJkp3z9M/W+GGzgRkJZorqZqznxL6RNFvGd8YM/jm1ICUgdtPlCjZ/yI2/56zF7j2zUuRJ5sZwAQ00xXzH6eWiYewU0e",
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
				try {
					const name = profile?.name
						? profile?.name?.split(' ')
						: ['', ''];

					const {data} = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signin`,
						{
							email: profile?.email,
							firstName: name[0],
							lastName: name[1],
						}
					);

					cookies().set({
						name: COOKIE_NAME,
						value: JSON.stringify({
							...data.data.user,
							accessToken: data?.data?.accessToken,
							refreshToken: data?.data?.refreshToken,
						}),
						httpOnly: true,
						maxAge: COOKIE_MAX_AGE,
						path: '/',
						sameSite: 'strict',
						secure: process.env.NODE_ENV === 'production',
					});

					return true;
				} catch (error) {
					// console.error('[GOOGLE-SIGIN-API-ERROR]', error);
				}
			}
			return true; 
		},
		async redirect({url, baseUrl}) {
			return url || baseUrl;
		},
	},
});

export {handler as GET, handler as POST};
