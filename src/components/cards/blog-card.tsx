import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
	useGlobalStore,
	useDeleteBlogModalStore,
} from '@/hooks/use-global-store';
import {Blog} from '@/types/types';
import {PencilIcon, TrashIcon} from 'lucide-react';
import {formatBlogSlug} from '@/utils/slug.formatter';

interface BlogCardProps {
	blog: Blog;
}

const BlogCard = ({blog}: BlogCardProps) => {
	const {user, updateBlog} = useGlobalStore();

	const deleteCardModal = useDeleteBlogModalStore();

	return (
		<div
			key={blog.id}
			className='w-[360px] h-[480px flex flex-col space-y-5 border rounded-md p-2'
		>
			{user && user?.role === 'ADMIN' && (
				<div className='flex justify-end space-x-4'>
					<div className='p-1 bg-white border border-slate-400 backdrop-blur-sm rounded-full cursor-pointer'>
						<PencilIcon
							size={14}
							onClick={() => {
								// deleteCardModal.onOpen();

								// deleteCardModal.updatePayload(blog);
							}}
							className='text-green-600'
						/>
					</div>
					<div className='p-1 bg-white border border-slate-400 backdrop-blur-sm rounded-full cursor-pointer'>
						<TrashIcon
							size={14}
							onClick={() => {
								deleteCardModal.onOpen();

								deleteCardModal.updatePayload(blog);
							}}
							className='text-red-600'
						/>
					</div>
				</div>
			)}

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

			<h1 className='text-sm font-medium h-[40px]'>{blog.title}</h1>

			<section className='text-sm text-slate-600'>
				{blog.description.slice(0, 250)}...
			</section>
		</div>
	);
};

export default BlogCard;
