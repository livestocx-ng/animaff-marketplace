import axios, {AxiosError} from 'axios';
import {NextRequest, NextResponse} from 'next/server';

export async function PATCH(req: NextRequest) {
	try {
		const payload = await req.json();

		const email = req.nextUrl.searchParams.get('email');
		const token = req.nextUrl.searchParams.get('token');

		const {data} = await axios.patch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?email=${email}&token=${token}`,
			payload
		);

		// console.log('[DATA] :: ', data);

		return NextResponse.json(data, {status: 200});
	} catch (e) {
		const error = e as AxiosError;

		// console.log('[ERROR] :: ', error);

		return NextResponse.json(
			{message: 'An error occured', error: error},
			{status: 400}
		);
	}
}
