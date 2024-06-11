'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	useGlobalStore,
	useUpdateProductModalStore,
} from '@/hooks/use-global-store';
import {Media} from '@/types/types';
import {
	getFilesTypeCount,
	createBlobImageUrls,
} from '@/utils/media/file.mutation';
import {FilterOptions} from '@/data';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {X, FileVideo, ImagePlus} from 'lucide-react';
import ButtonLoader from '@/components/loader/button-loader';
import {useEffect, useReducer, useRef, useState} from 'react';
import {isFileSizeValid} from '@/utils/media/file.validation';
import FormTextInput from '@/components/input/form-text-input';
import FormTextAreaInput from '@/components/input/form-text-area-input';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';
import {ValidateUpdateProductFormData} from '@/utils/form-validations/product.validation';

export type FormData = {
	id: string;
	price: number;
	name: string;
	discountPrice: string;
	description: string;
	category: string;
	media: File[];
	existingMedia: Media[];
	removedMediaIds: string[];
	inStock: boolean;
	isNegotiable: boolean;
	zipPostalCode: string;
	isOrganicallyRaised: boolean;
	isHomeBred: boolean;
	isMeat: boolean;
	isPet: boolean;
	isPedigree: boolean;
	isNonPedigree: boolean;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	id: '',
	name: '',
	price: 0,
	description: '',
	discountPrice: '0',
	category: '',
	media: [],
	inStock: false,
	isNegotiable: false,
	existingMedia: [],
	removedMediaIds: [],
	zipPostalCode: '',
	isOrganicallyRaised: false,
	isHomeBred: false,
	isMeat: false,
	isPet: false,
	isPedigree: false,
	isNonPedigree: false,
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

type Checked = DropdownMenuCheckboxItemProps['checked'];

const UpdateProductModal = () => {
	const {user} = useUserHook();
	const {updateProduct} = useGlobalStore();

	const {onClose, payload} = useUpdateProductModalStore();

	const mediaImageRef = useRef<HTMLInputElement>(null);
	const mediaVideoRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [mediaBlobs, setMediaBlobs] = useState<string[]>([]);
	const [category, setProductCategory] = useState<string>('cow');
	const [showStatusBar, setShowStatusBar] = useState<Checked>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				id: payload?.id,
				name: payload?.name,
				price: payload?.price,
				category: payload?.category,
				discountPrice: payload?.discountPrice.toString(),
				description: payload?.description,
				existingMedia: payload?.media,
				inStock: payload?.inStock,
				isNegotiable: payload?.isNegotiable,
				zipPostalCode: payload?.zipPostalCode,
				isOrganicallyRaised: payload?.isOrganicallyRaised,
				isHomeBred: payload?.isHomeBred,
				isMeat: payload?.isMeat,
				isPet: payload?.isPet,
				isPedigree: payload?.isPedigree,
				isNonPedigree: payload?.isNonPedigree,
			},
		});
	}, [payload]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const openImageFileInput = () => {
		if (mediaImageRef.current) {
			mediaImageRef.current.click();
		}
	};

	const openVideoFileInput = () => {
		if (mediaVideoRef.current) {
			mediaVideoRef.current.click();
		}
	};

	const handleMediaUpload = (
		event: React.ChangeEvent<HTMLInputElement>,
		uploadType: string
	) => {
		let exceededSize = false;
		const media: File[] = [...formData.media];
		const selectedFiles = event.target.files!;

		if (selectedFiles.length === 0) return;

		const totalMediaCount = media.length + selectedFiles?.length;

		const imageCount = formData.existingMedia.filter(
			(file) => file.mediaType === 'IMAGE'
		).length;

		const videoCount = formData.existingMedia.filter(
			(file) => file.mediaType === 'VIDEO'
		).length;

		if (totalMediaCount > 4) {
			return toast.error(
				'You have reached the maximum of 4 files allowed for upload.'
			);
		}

		if (uploadType === 'IMAGE') {
			if (
				(imageCount && imageCount > 3) ||
				imageCount + selectedFiles.length > 3
			) {
				return toast.error(
					'You have exceeded the maximum allowed number of images(3).'
				);
			}
		}

		if (uploadType !== 'IMAGE') {
			if (
				(videoCount && videoCount > 1) ||
				videoCount + selectedFiles.length > 1
			) {
				return toast.error(
					'You have exceeded the maximum allowed number of videos(1).'
				);
			}
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
				'One or more image | video files exceed the file size limit of 3MB for images | 5MB for videos'
			);
		} else {
			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {media},
			});

			setMediaBlobs(createBlobImageUrls(media));

			// console.log(formData.media);
		}
	};

	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// console.log(formData);

		// return;

		try {
			setLoading(true);

			const validationError = ValidateUpdateProductFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError);
			}

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/products/update?productId=${formData.id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] :: ', data);

			setLoading(false);

			toast.success('Product updated');

			// close modal
			onClose();

			updateProduct(payload.id, data.data);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-PRODUCT-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-[90%] lg:w-[60%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto scrollbar__1'
			>
				<div className='flex items-center justify-between px4 w-full'>
					<h1 className='font-medium'>Update Product</h1>

					<Button
						type='button'
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col-reverse lg:flex-row items-start justify-between w-full'>
					<div className='w-full lg:w-[30%] flex flex-col space-y-5'>
						{/* <div
							onClick={openImageFileInput}
							className='w-full bg-slate-200  flex flex-col items-center justify-center space-y-3 px-4 py-8 cursor-pointer'
						>
							<UploadCloud className='w-10 h-10' />
							<p className='text-center text-xs'>
								Upload picture of product
							</p>
						</div> */}

						<input
							type='file'
							name='media'
							ref={mediaImageRef}
							multiple={true}
							style={{display: 'none'}}
							accept='.jpeg, .jpg'
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => handleMediaUpload(event, 'IMAGE')}
						/>

						<input
							type='file'
							name='media'
							ref={mediaVideoRef}
							multiple={true}
							style={{display: 'none'}}
							accept='.mp4'
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => handleMediaUpload(event, 'VIDEO')}
						/>

						<div className='flex items-start space-x-5'>
							<div
								onClick={openImageFileInput}
								className='p-3 border text-center cursor-pointer'
							>
								<ImagePlus className='text-black' />
							</div>
							<p className='text-xs text-red-500'>
								Add pictures of product (maximum of 3 images 3MB
								each).{' '}
								<span className='text-black'>
									You can resize your image{' '}
									<Link
										href={'https://www.reduceimages.com/'}
										target='_blank'
										className='text-sky-500 font-medium'
									>
										here
									</Link>{' '}
								</span>
							</p>
						</div>

						<div className='flex items-start space-x-5'>
							<div
								onClick={openVideoFileInput}
								className='p-3 border text-center cursor-pointer'
							>
								<FileVideo className='text-black' />
							</div>
							<p className='text-xs text-red-500'>
								Add video of product (maximum of 1 video 5MB)
							</p>
						</div>

						{formData.media.length > 0 && (
							<div className='flex flex-col justify-center space-y-3 mx-auto w-full'>
								<Button
									type='button'
									disabled={loading}
									onClick={() => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												media: formData.media.filter(
													(media) =>
														media.type.includes(
															'video'
														)
												),
											},
										});

										setMediaBlobs(
											createBlobImageUrls(
												formData.media.filter((media) =>
													media.type.includes('video')
												)
											)
										);
									}}
									variant={'outline'}
									className='border-0 bg-red-600 hover:bg-red-600 text-xs h-12 text-white hover:text-white rounded-none py-2 px-4 w-full lg:w-[200px] mx-auto'
								>
									Reset Uploaded Images
								</Button>
								<Button
									type='button'
									disabled={loading}
									onClick={() => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												media: formData.media.filter(
													(media) =>
														media.type.includes(
															'image'
														)
												),
											},
										});

										setMediaBlobs(
											createBlobImageUrls(
												formData.media.filter((media) =>
													media.type.includes('image')
												)
											)
										);
									}}
									variant={'outline'}
									className='border-0 bg-red-600 hover:bg-red-600 text-xs h-12 text-white hover:text-white rounded-none py-2 px-4 w-full lg:w-[200px] mx-auto'
								>
									Reset Uploaded Videos
								</Button>
							</div>
						)}

						{formData.media.length > 0 && (
							<p className='text-center text-xs font-semibold'>
								{getFilesTypeCount(formData.media, 'image')}{' '}
								Images |{' '}
								{getFilesTypeCount(formData.media, 'video')}{' '}
								Videos
							</p>
						)}
					</div>

					<div className='w-full lg:w-[70%] flex flex-col space-y-3 lg:pl-8'>
						{/* <CategoryDropDownButton
							value={category}
							setValue={setProductCategory}
							setShowStatusBar={setShowStatusBar}
							classes='bg-sky-600 rounded-none hover:bg-sky-600 text-white hover:text-white w-full lg:w-fit'
						/> */}
						<div className='w-full'>
							<p className='text-xs'>Product Category</p>
							<select
								name='category'
								value={formData.category}
								className='w-full border py-3 px-3 text-xs scrollbar__1'
								onChange={handleSelectChange}
							>
								<option value='' className='text-xs'>
									Product Category
								</option>
								{FilterOptions.map((option) => (
									<option
										key={option.id}
										className='cursor-pointer text-xs'
										value={option.value.toUpperCase()}
									>
										{option.title}
									</option>
								))}
							</select>
						</div>

						<div className='space-y-'>
							<p className='text-xs'>Name</p>
							<FormTextInput
								name='name'
								disabled={loading}
								padding='py-3 px-4'
								value={formData.name}
								handleChange={handleChange}
								placeHolder='Product name'
								classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 '
							/>
						</div>
						<div className='space-y-'>
							<p className='text-xs'>Zip/Postal Code</p>
							<FormTextInput
								type='number'
								disabled={loading}
								padding='py-3 px-4'
								name='zipPostalCode'
								handleChange={handleChange}
								placeHolder='Zip/Postal Code'
								value={formData.zipPostalCode}
								classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 '
							/>
						</div>
						<div className='flex items-center justify-between'>
							<div className='space-y- w-[45%]'>
								<p className='text-xs'>Price</p>
								<FormTextInput
									name='price'
									disabled={loading}
									padding='py-3 px-4'
									value={`${formData.price}`}
									handleChange={handleChange}
									placeHolder='Price'
									classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 '
								/>
							</div>
							<div className='space-y- w-[45%]'>
								<p className='text-xs'>Discount Price</p>
								<FormTextInput
									name='discountPrice'
									padding='py-3 px-4'
									disabled={loading}
									handleChange={handleChange}
									placeHolder='Discount price'
									value={`${formData.discountPrice}`}
									classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 '
								/>
							</div>
						</div>

						<div className='space-y- w-full'>
							<p className='text-xs'>Description</p>
							<FormTextAreaInput
								rows={4}
								name='description'
								disabled={loading}
								handleChange={handleTextAreaChange}
								value={formData.description}
								placeHolder='Description'
								padding={'py-3 px-2'}
								classes='w-full text-xs placeholder:text-xs border border-red-300 focus:border-red-300  resize-none'
							/>
						</div>

						<div className='flex flex-wrap gap-4 items-center justify- space-x-'>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isNegotiable'
									checked={formData.isNegotiable}
									onCheckedChange={(
										isNegotiable: boolean
									) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {isNegotiable},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Negotiable
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='inStock'
									checked={formData.inStock}
									onCheckedChange={(inStock: boolean) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {inStock},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									{formData.inStock == true
										? 'Available'
										: 'Sold Out'}
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isOrganicallyRaised'
									checked={formData.isOrganicallyRaised}
									onCheckedChange={(
										isOrganicallyRaised: boolean
									) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {isOrganicallyRaised},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Organically Raised
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isHomeBred'
									checked={formData.isHomeBred}
									onCheckedChange={(isHomeBred: boolean) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {isHomeBred},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Home Bred
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isMeat'
									checked={formData.isMeat}
									onCheckedChange={(isMeat: boolean) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {isMeat},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Meat
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isPet'
									checked={formData.isPet}
									onCheckedChange={(isPet: boolean) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {isPet},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Pet
								</label>
							</div>

							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isPedigree'
									checked={formData.isPedigree}
									onCheckedChange={(isPedigree: boolean) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												isPedigree,
												isNonPedigree: false,
											},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Pedigree
								</label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='isNonPedigree'
									checked={formData.isNonPedigree}
									onCheckedChange={(
										isNonPedigree: boolean
									) => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												isNonPedigree,
												isPedigree: false,
											},
										});
									}}
								/>
								<label
									htmlFor='terms'
									className='text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
								>
									Non Pedigree
								</label>
							</div>
						</div>

						<div className='flex flex-wrap items-center w-full gap-y-3 gap-x-5'>
							{formData.existingMedia
								.filter((media) => media.mediaType === 'IMAGE')
								.map((media) => (
									<CurrentImageToolTip
										key={media.id}
										media={media}
										handleImageClick={() => {
											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													existingMedia:
														formData.existingMedia.filter(
															(_media) =>
																_media.id !==
																media.id
														),
													removedMediaIds: [
														...formData.removedMediaIds,
														media.mediaKey,
													],
												},
											});
										}}
									/>
								))}
						</div>
						<div className='flex flex-wrap items-center w-full gap-y-3 gap-x-5'>
							{mediaBlobs.map((blob) => (
								<ImageToolTip key={blob} image={blob} />
							))}
						</div>

						<div className='flex flex-wrap items-center w-full gap-y-3 gap-x-5'>
							{formData.existingMedia
								.filter((media) => media.mediaType === 'VIDEO')
								.map((media) => (
									<CurrentVideoToolTip
										key={media.id}
										media={media}
										handleVideoClick={() => {
											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													existingMedia:
														formData.existingMedia.filter(
															(_media) =>
																_media.id !==
																media.id
														),
													removedMediaIds: [
														...formData.removedMediaIds,
														media.mediaKey,
													],
												},
											});
										}}
									/>
								))}
						</div>
						<div className='flex flex-wrap justify-between items-center w-full gap-y-2'>
							{formData.media
								.filter((file) => file.type.includes('video'))
								.map((file, index) => (
									<VideoToolTip key={index} file={file} />
								))}
						</div>
					</div>
				</div>

				<div className='flex justify-end pt-1'>
					{loading ? (
						<Button
							// disabled
							type='button'
							variant={'outline'}
							className='w-full lg:w-[200px] bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							variant={'outline'}
							className='w-full lg:w-[200px] bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							Update
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default UpdateProductModal;

const CurrentImageToolTip = ({
	media,
	handleImageClick,
}: {
	media: Media;
	handleImageClick: () => void;
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className='h-[80px] w-[80px] relative'>
						<Image
							fill
							unoptimized={true}
							src={media.mediaUrl}
							// width={40}
							// height={40}
							alt={'Blob'}
							className='object-cover h-full w-full'
						/>

						<p
							onClick={handleImageClick}
							className='absolute top-0 right-0 text-xs text-black p-2 h-3 w-3 bg-white flex justify-center items-center cursor-pointer'
						>
							x
						</p>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<div className='h-[200px] w-[200px] relative'>
						<Image
							fill
							unoptimized={true}
							src={media.mediaUrl}
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
const ImageToolTip = ({image}: {image: string}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className='h-[80px] w-[80px] relative'>
						<Image
							fill
							unoptimized={true}
							src={image}
							// width={40}
							// height={40}
							alt={'Blob'}
							className='object-cover h-full w-full'
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<div className='h-[200px] w-[200px] relative'>
						<Image
							fill
							src={image}
							unoptimized={true}
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

const CurrentVideoToolTip = ({
	media,
	handleVideoClick,
}: {
	media: Media;
	handleVideoClick: () => void;
}) => {
	return (
		<div className='h-[180px] w-[45%] relative'>
			<video
				controls
				src={media.mediaUrl}
				className='object-cover h-full w-full'
			/>
			<p
				onClick={handleVideoClick}
				className='absolute top-0 right-0 text-xs text-white p-2 h-4 w-4 bg-red-500 flex justify-center items-center cursor-pointer'
			>
				x
			</p>
		</div>
	);
};

const VideoToolTip = ({file}: {file: File}) => {
	return (
		<div className='h-[180px] w-[45%]'>
			<video
				controls
				src={URL.createObjectURL(file)}
				className='object-cover h-full w-full'
			/>
		</div>
	);
};
