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
import {formatBlogSlug} from '@/utils/slug.formatter';

const BlogPage = () => {
	const router = useRouter();

	const {blogs, updateBlog} = useGlobalStore();

	console.log(blogs);

	return (
		<Fragment>
			<MainNavbar />

			<main className='bg-[#28312B]'>
				<section className='h-[25vh] md:h-[280px] w-full bg-blog bg-cover flex flex-col items-left justify-center gap-y-3 md:gap-y-10 px-4 md:px-8 py-2 md:py-10 md:pb-2'>
					<h1 className='text-lg md:text-4xl font-medium text-white'>
						Blog
					</h1>
				</section>

				<div className='flex flex-col w-full bg-white px-4 md:px-8 pt-2 pb-10'>
					<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-2'>
						{blogs.map((blog) => {
							return (
								<div
									key={blog.id}
									className='w-[360px] h-[480px flex flex-col space-y-5 border rounded-md p-2'
								>
									<Link
										prefetch
										onClick={() => updateBlog(blog)}
										href={`/blog/${formatBlogSlug(blog)}`}
										className='w-full h-[240px] relative cursor-pointer rounded-md'
									>
										<Image
											fill
											// width={200}
											// height={200}
											unoptimized={true}
											src={blog.imageUrl}
											alt={`Animaff Blog - ${blog.title}`}
											className='object-cover rounded-t-md'
										/>
									</Link>

									<h1 className='text-sm font-medium h-[40px]'>
										{blog.title}
									</h1>

									<p className='text-sm text-slate-600'>
										{blog.description.slice(0, 250)}...
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default BlogPage;
