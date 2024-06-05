import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {COOKIE_NAME} from '@/lib/constants';

export async function GET(req: Request) {
	const cookieStore = cookies();

	// // console.log('[COOKIES] :: ', cookieStore);

	const cookie = cookieStore.get(COOKIE_NAME);

	// // console.log('[COOKIE] :: ', cookie);

	if (!cookie) {
		return NextResponse.json({message: 'Unauthorized'}, {status: 401});
	}

	const user = cookie?.value;

	// // console.log('[USER-TYPE] :: ', typeof user);

	return NextResponse.json(JSON.parse(user), {status: 200});
}
