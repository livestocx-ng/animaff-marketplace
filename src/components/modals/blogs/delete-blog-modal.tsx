'use client';
import {X} from 'lucide-react';
import {
	useGlobalStore,
	useDeleteBlogModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {useEffect, useReducer, useState} from 'react';
import ButtonLoader from '@/components/loader/button-loader';

export type FormData = {
	id: number;
	title: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	id: 0,
	title: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const DeleteBlogModal = () => {
	const {blogs, updateBlogs} = useGlobalStore();
	const {payload, onClose} = useDeleteBlogModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				id: payload.id,
				title: payload.title,
			},
		});
	}, [payload]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/blog/delete?blogId=${formData.id}`
			);

			// console.log('[DATA] :: ', data);

			setLoading(false);

			toast.success('Blog deleted', {
				className: 'text-xs sm:text-sm',
			});

			// close modal
			onClose();

			updateBlogs(blogs.filter((blog) => blog.id !== payload.id));
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[DELETE-PRODUCT-ERROR]', _error);

			toast.error('An error occurred', {
				className: 'text-xs sm:text-sm',
			});
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-[90%] md:w-[40%] bg-white py-2 px-4  overflow-y-auto scrollbar__1'
			>
				<div className='flex items-center justify-between px4'>
					<h1 className='text-red-500 font-mediumage'>Delete Blog</h1>

					<Button
						type='button'
						disabled={loading}
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex items-center justify-center w-full py-8'>
					<p>
						Are you sure you want to delete the "{formData.title}"
						blog item?
					</p>
				</div>

				<div className='flex justify-end'>
					{loading ? (
						<Button
							// disabled
							type='button'
							variant={'outline'}
							className='w-full md:w-[200px] bg-red-500 hover:bg-red-500 text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							variant={'outline'}
							className='w-full md:w-[200px] bg-red-500 hover:bg-red-600 text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							Delete
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default DeleteBlogModal;
