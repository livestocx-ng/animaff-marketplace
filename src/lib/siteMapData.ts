import {Product} from '@/types/types';
import axios from 'axios';
import {NextResponse} from 'next/server';

export async function fetchSiteProducts(): Promise<Product[]> {
	const {data} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all?page=1`
	);

	return data.data.products;
}
