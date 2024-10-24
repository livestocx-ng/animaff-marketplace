import {serialize} from 'cookie';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {COOKIE_NAME} from '@/lib/constants';

export async function GET(req: Request) {
	const cookieStore = await cookies();

	await cookieStore.delete(COOKIE_NAME);
	await cookieStore.delete('next-auth.csrf-token');
	await cookieStore.delete('next-auth.session-token');

	return NextResponse.json(
		{message: 'SUCCESS'},
		{
			status: 200,
		}
	);
}
