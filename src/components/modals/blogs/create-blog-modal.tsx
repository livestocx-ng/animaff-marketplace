'use client';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {ImagePlus, MinusCircle, PlusCircle, RssIcon, X} from 'lucide-react';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import ButtonLoader from '@/components/loader/button-loader';
import {useEffect, useReducer, useRef, useState} from 'react';
import {isFileSizeValid} from '@/utils/media/file.validation';
import FormTextInput from '@/components/input/form-text-input';
import FormTextAreaInput from '@/components/input/form-text-area-input';
import {useGlobalStore, useCreateBlogStore} from '@/hooks/use-global-store';
import Link from 'next/link';
import Image from 'next/image';
import {createBlobImageUrls} from '@/utils/media/file.mutation';

export type FormData = {
	title: string;
	description: string;
	media: File[];
	blogArticles: {
		title: string;
		description: string;
	}[];
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'ADD_ARTICLE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	title: '',
	description: '',
	blogArticles: [],
	media: [],
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		case 'ADD_ARTICLE':
			return {
				...state,
				blogArticles: [
					...state.blogArticles,
					{title: '', description: ''},
				],
			};
		default:
			return state;
	}
};

const CreateBlogModal = () => {
	const {user} = useUserHook();

	const blogImageRef = useRef<HTMLInputElement>(null);
	const blogArticleImageRef = useRef<HTMLInputElement>(null);

	const {onClose} = useCreateBlogStore();
	const {updateProducts} = useGlobalStore();

	const [blogImage, setBlogImage] = useState<File>();
	const [blogImageBlob, setBlogImageBlob] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	const [blogArticleImages, setBlogArticleImages] = useState<File[]>([]);
	const [blogArticleImageBlobs, setBlogArticleImageBlobs] = useState<
		string[]
	>([]);

	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleAddArticle = () => {
		updateFormData({type: 'ADD_ARTICLE', payload: {}});
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleArticleChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const updatedArticles = formData.blogArticles.map((article, i) =>
			i === index
				? {...article, [event.target.name]: event.target.value}
				: article
		);

		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {blogArticles: updatedArticles},
		});
	};

	const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		let exceededSize = false;

		const file: File = event.target.files![0];

		if (isFileSizeValid(file)) {
			const newFile = new File([file], 'blog_image', {type: file.type});

			setBlogImage(newFile);

			setBlogImageBlob(URL.createObjectURL(file));
		} else {
			exceededSize = true;
		}

		if (exceededSize) {
			return toast.error('Image exceeds the file size limit of 3MB', {
				className: 'text-xs sm:text-sm',
			});
		}
	};

	const handleBlogArticlesImagesUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let exceededSize = false;
		const media: File[] = [];
		const selectedFiles = event.target.files!;

		if (selectedFiles.length === 0) return;

		if (selectedFiles.length > formData.blogArticles.length) {
			return toast.error(
				`You have exceeded the maximum of ${formData.blogArticles.length} files allowed for blog articles.`,
				{className: 'text-xs sm:text-sm'}
			);
		}

		if (selectedFiles) {
			for (let index = 0; index < selectedFiles.length; index++) {
				if (isFileSizeValid(selectedFiles[index])) {
					media.push(selectedFiles[index]);
				} else {
					exceededSize = true;
				}
			}
		}

		if (exceededSize) {
			return toast.error(
				'One or more image files exceed the file size limit of 3MB for image',
				{className: 'text-xs sm:text-sm'}
			);
		} else {
			setBlogArticleImages(media);

			setBlogArticleImageBlobs(createBlobImageUrls(media));
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const FormData = {
				...formData,
				media: [...blogArticleImages, blogImage],
			};

			if (!FormData.title) {
				setLoading(false);
				return toast.error('Blog title is required', {
					className: 'text-xs sm:text-sm',
				});
			} else if (!FormData.description) {
				setLoading(false);
				return toast.error('Blog description is required', {
					className: 'text-xs sm:text-sm',
				});
			} else if (
				!FormData.media.find((file) =>
					file?.name.includes('blog_image')
				)
			) {
				setLoading(false);
				return toast.error('Blog image is required', {
					className: 'text-xs sm:text-sm',
				});
			} else if (FormData.blogArticles.length > 0) {
				for (let i = 0; i < FormData.blogArticles.length; i++) {
					const article = FormData.blogArticles[i];

					if (!article.title) {
						setLoading(false);
						return toast.error(
							`Article ${i + 1} title is required`,
							{
								className: 'text-xs sm:text-sm',
							}
						);
					}

					if (!article.description) {
						setLoading(false);
						return toast.error(
							`Article ${i + 1} description is required`,
							{
								className: 'text-xs sm:text-sm',
							}
						);
					}
				}
			}

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/blog/create`,
				FormData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log('[DATA] :: ', data);

			setLoading(false);

			toast.success('Blog created', {
				className: 'text-xs sm:text-sm',
			});

			onClose();
		} catch (error) {
			setLoading(false);

			console.log('[CREATE-BLOG-ERROR] :: ', error);

			const _error = error as AxiosError;

			console.log('[CREATE-BLOG-AXIOS-ERROR] :: ', _error);

			toast.error('An error occurred', {
				className: 'text-xs sm:text-sm',
			});
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-[90%] md:w-[50%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto scrollbar__1'
			>
				<div className='flex items-center justify-between px4'>
					<h1 className='font-medium'>Create Blog</h1>

					<Button
						type='button'
						// disabled={loading}
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col items-center justify-center w-full py-4 space-y-4'>
					<div className='w-full'>
						<p className='text-xs'>Title</p>
						<FormTextInput
							name='title'
							disabled={loading}
							padding='py-3 px-4'
							value={formData.title}
							handleChange={handleChange}
							placeHolder='Title'
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 '
						/>
					</div>
					<div className='w-full'>
						<p className='text-xs'>Description</p>
						<FormTextAreaInput
							rows={4}
							name='description'
							disabled={loading}
							handleChange={handleChange}
							value={formData.description}
							placeHolder='Description'
							padding={'py-3 px-4'}
							classes='w-full text-xs placeholder:text-xs border focus:border-slate-500  resize-none'
						/>
					</div>

					<div className='w-full space-y-2'>
						<div
							onClick={() => {
								if (blogImageRef.current) {
									blogImageRef.current?.click();
								}
							}}
							className='w-full cursor-pointer'
						>
							<input
								type='file'
								name='media'
								multiple={true}
								ref={blogImageRef}
								accept='.jpeg, .jpg'
								style={{display: 'none'}}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>
								) => handleMediaUpload(event)}
							/>

							<div className='flex items-center space-x-5'>
								<div className='p-3 rounded-sm border border-blue-400 text-center '>
									<ImagePlus className='text-blue-600' />
								</div>
								<p className='text-xs underline text-blue-600'>
									Add blog image.
								</p>
							</div>
						</div>

						{blogImageBlob && (
							<ImageToolTip
								key={blogImageBlob}
								imageUrl={blogImageBlob}
							/>
						)}
					</div>

					<div className='w-full flex items-center space-x-2 pt-5 pb-3'>
						<p
							onClick={handleAddArticle}
							className='cursor-pointer text-sm underline font-semibold'
						>
							Add Article
						</p>
						<RssIcon size={16} />
					</div>

					{formData.blogArticles.length > 0 && (
						<div className='w-full space-y-2'>
							<div
								onClick={() => {
									if (blogArticleImageRef.current) {
										blogArticleImageRef.current?.click();
									}
								}}
								className='w-full cursor-pointer'
							>
								<input
									type='file'
									name='media'
									multiple={true}
									max={formData.blogArticles.length}
									maxLength={formData.blogArticles.length}
									ref={blogArticleImageRef}
									accept='.jpeg, .jpg'
									style={{display: 'none'}}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) => handleBlogArticlesImagesUpload(event)}
								/>

								<div className='flex justify-end items-center space-x-5'>
									<p className='text-xs underline text-blue-600'>
										Add article images (maximum of{' '}
										{`${formData.blogArticles.length}`}).{' '}
									</p>
									<div className='p-3 rounded-sm border border-blue-400 text-center '>
										<ImagePlus className='text-blue-600' />
									</div>
								</div>
							</div>

							<div className='flex flex-wrap gap-x-2 gap-y-2'>
								{blogArticleImageBlobs.map((blob) => (
									<ImageToolTip key={blob} imageUrl={blob} />
								))}
							</div>
						</div>
					)}

					{formData.blogArticles.map((article, index) => (
						<div
							key={index}
							className={`w-full pt-2 pb-6 ${
								index !== formData.blogArticles.length - 1 &&
								'border-b border-b-slate-400'
							}`}
						>
							<div className='flex items-center justify-between '>
								<h1 className='text-xs font-bold'>
									Article - {index + 1}
								</h1>

								<Button
									type='button'
									disabled={loading}
									onClick={() => {
										setBlogArticleImages([]);
										setBlogArticleImageBlobs([]);

										const updatedArticles =
											formData.blogArticles.filter(
												(_, i) => i !== index
											);

										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												blogArticles: updatedArticles,
											},
										});

										
									}}
									className='bg-white hover:bg-white'
								>
									<MinusCircle className='text-red-500 h-4 w-4' />
								</Button>
							</div>
							<div className='w-full'>
								<p className='text-xs'>Article Title</p>
								<FormTextInput
									name='title'
									disabled={loading}
									padding='py-3 px-4'
									value={article.title}
									handleChange={(e) =>
										handleArticleChange(index, e)
									}
									placeHolder={`Title`}
									classes='w-full text-xs placeholder:text-xs border focus:border-slate-500'
								/>
							</div>

							<div className='w-full mt-4'>
								<p className='text-xs'>Article Description</p>
								<FormTextAreaInput
									rows={4}
									name='description'
									disabled={loading}
									value={article.description}
									handleChange={(e) =>
										handleArticleChange(index, e)
									}
									placeHolder={`Description`}
									padding={'py-3 px-4'}
									classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 resize-none'
								/>
							</div>
						</div>
					))}
				</div>

				<div className='flex justify-end'>
					{loading ? (
						<Button
							// disabled
							type='button'
							variant={'outline'}
							className='w-full md:w-[200px] bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							variant={'outline'}
							className='w-full md:w-[200px] bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							Submit
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreateBlogModal;

const ImageToolTip = ({imageUrl}: {imageUrl: string}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className='h-[80px] w-[120px] relative'>
						<Image
							fill
							unoptimized={true}
							src={imageUrl}
							// width={40}
							// height={40}
							alt={'Blob'}
							className='object-cover h-full w-full'
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<div className='h-[160px] w-[200px] relative'>
						<Image
							fill
							unoptimized={true}
							src={imageUrl}
							// width={40}
							// height={40}
							alt={'Blob'}
							className='object-cover h-full w-full'
						/>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
