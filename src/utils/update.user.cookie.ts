import {serialize} from 'cookie';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {COOKIE_MAX_AGE, COOKIE_NAME} from '@/lib/constants';

export function UpdateUserCookies(data: {}) {
	const cookieStore = cookies();

	const cookie = cookieStore.get(COOKIE_NAME);

	const currentUser = JSON.parse(cookie?.value!);

	const user = {
		...data,
		...currentUser,
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
}
