'use client';
import axios from 'axios';
import Image from 'next/image';
import {
	useGlobalStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import Footer from '@/components/navigation/footer';
import {useRouter, useSearchParams} from 'next/navigation';
import {Fragment, useEffect, useRef, useState} from 'react';
import MainNavbar from '@/components/navigation/main-nav-bar';
import Link from 'next/link';

interface BlogDetailsPageParams {
	params: {
		blogId: string;
	};
}

const BlogDetailsPage = ({params: {blogId}}: BlogDetailsPageParams) => {
	const router = useRouter();

	const {blog, user, updateBlog} = useGlobalStore();

	const [loading, setLoading] = useState(false);

	const handleViewBlog = async () => {
		try {
			const formattedBlogId = blogId.split('_')[1];

			axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/blog/view?blogId=${formattedBlogId}`
			);

			// console.log('[VIEW-BLOG-RESPONSE] :: ', data);
		} catch (error) {
			// console.log('[VIEW-BLOG-ERROR] :: ', error);
		}
	};

	const handleUserViewBlog = async () => {
		try {
			const formattedBlogId = blogId.split('_')[1];

			axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/blog/user-view?blogId=${formattedBlogId}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[VIEW-BLOG-RESPONSE] :: ', data);
		} catch (error) {
			// console.log('[VIEW-BLOG-ERROR] :: ', error);
		}
	};

	const fetchBlogDescription = async () => {
		try {
			setLoading(true);

			if (blog) {
				setLoading(false);
				return;
			}

			const formattedBlogId = blogId.split('_')[1];

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/blog/fetch?blogId=${formattedBlogId}`
			);

			updateBlog(data.data);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			// console.log('[FETCH-BLOG-ERROR] :: ', error);
		}
	};

	useEffect(() => {
		if (user) {
			handleUserViewBlog();
		}
	}, [user]);

	useEffect(() => {
		fetchBlogDescription();

		handleViewBlog();
	}, []);

	return (
		<Fragment>
			<MainNavbar />

			<main className='bg-[#28312B]'>
				<section
					className={`h-[25vh] md:h-[280px] w-full bg-blo bg-cover flex flex-col items-left justify-center gap-y-3 md:gap-y-10 px-4 md:px-8 py-2 md:py-10 md:pb-2`}
				>
					<h1 className='text-lg md:text-4xl font-medium text-white'>
						{!blog ? 'Blog' : blog?.title}
					</h1>
				</section>

				<div className='flex flex-col space-y-5 md:space-y-12 w-full bg-white px-4 md:px-[10%] py-10'>
					<div className='w-full h-[280px] md:h-[600px] relative'>
						<Image
							fill
							unoptimized={true}
							src={blog?.imageUrl!}
							className='object-cover rounded-md'
							alt={`Animaff ${blog?.title} - ${blog?.title}`}
						/>
					</div>

					<p
						className='text-sm leading-6'
						style={{whiteSpace: 'pre-wrap'}}
					>
						{blog?.description}
					</p>

					{blog?.articles.map((article, index) => (
						<div
							key={article.id}
							className='flex flex-col space-y-5'
						>
							<h1 className='text-base font-semibold'>
								{article?.title}
							</h1>
							{article.imageUrl && (
								<div
									className={`w-full sm:w-[50%] h-[280px] md:h-[400px] relative`}
								>
									<Image
										fill
										unoptimized={true}
										src={article.imageUrl}
										alt={`Animaff ${blog.title} - ${article.title}`}
										className='object-cover rounded-md'
									/>
								</div>
							)}
							<p
								className='text-sm leading-6'
								style={{whiteSpace: 'pre-wrap'}}
							>
								{article?.description}
							</p>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default BlogDetailsPage;
