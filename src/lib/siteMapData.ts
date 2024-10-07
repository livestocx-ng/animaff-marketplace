import {Blog, Product} from '@/types/types';
import axios from 'axios';
import {NextResponse} from 'next/server';

export async function fetchSiteBlogs(): Promise<Blog[]> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/blog/fetch-all`,
		{
			cache: 'force-cache',
			next: {
				revalidate: 3600,
			},
		}
	);

	if (!response.ok) {
		throw new Error('Failed to fetch blogs');
	}

	const data = await response.json();
	return data.data;
}

export async function fetchSiteProducts(): Promise<Product[]> {
	const {data} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all?page=1`
	);

	return data.data.products;
}
