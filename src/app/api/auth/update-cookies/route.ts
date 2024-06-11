import {AxiosError} from 'axios';
import {serialize} from 'cookie';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';
import {COOKIE_MAX_AGE, COOKIE_NAME} from '@/lib/constants';

export async function PATCH(req: NextRequest) {
	try {
		const payload = await req.json();

		// console.log('[PAYLOAD] :: ', payload);

		const cookieStore = cookies();

		const cookie = cookieStore.get(COOKIE_NAME);

		const currentUser = JSON.parse(cookie?.value!);

		const user = {
			...currentUser,
			...payload,
		};

		// console.log('[NEW-USER] :: ', user);

		await cookieStore.delete(COOKIE_NAME);
		// console.log('[COOKIE-STORE] :: ', cookieStore);

		const serialized = serialize(COOKIE_NAME, JSON.stringify(user), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: COOKIE_MAX_AGE,
		});

		// console.log('[DATA] :: ', data.data);

		return NextResponse.json(user, {
			status: 200,
			headers: {'Set-Cookie': serialized},
		});
	} catch (e) {
		const error = e as AxiosError;

		// console.log('[ERROR] :: ', error);

		return NextResponse.json(
			{message: 'An error occurred while updating cookies', error: error},
			{status: 400}
		);
	}
}
