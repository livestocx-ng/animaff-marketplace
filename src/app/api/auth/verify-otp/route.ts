import axios, {AxiosError} from 'axios';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const token = req.nextUrl.searchParams.get('token');

		const {data} = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp?token=${token}`
		);

		// console.log('[DATA] :: ', data);

		return NextResponse.json(data, {status: 200});
	} catch (e) {
		const error = e as AxiosError;

		// console.log('[ERROR] :: ', error);

		return NextResponse.json(
			{message: 'An error occurred', error: error},
			{status: 400}
		);
	}
}
