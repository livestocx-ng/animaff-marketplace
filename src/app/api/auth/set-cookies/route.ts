import {serialize} from 'cookie';
import axios, {AxiosError} from 'axios';
import {NextResponse} from 'next/server';
import {COOKIE_MAX_AGE, COOKIE_NAME} from '@/lib/constants';

export async function POST(req: Request) {
	try {
		const {data} = await req.json();

		// // console.log('[CREDENTIALS-SIGNIN-DATA] :: ', data);

		const user = {
			...data?.data?.user,
			accessToken: data?.data?.accessToken,
			refreshToken: data?.data?.refreshToken,
		};

		const serialized = serialize(COOKIE_NAME, JSON.stringify(user), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: COOKIE_MAX_AGE,
		});

		return NextResponse.json(user, {
			status: 200,
			headers: {'Set-Cookie': serialized},
		});
	} catch (e) {
		const error = e as AxiosError;

		// console.log('[ERROR] :: ', error);

		return NextResponse.json(
			{message: 'An error occurred', error: error},
			{status: 400}
		);
	}
}
