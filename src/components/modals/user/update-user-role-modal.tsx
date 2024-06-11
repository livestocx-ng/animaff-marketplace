'use client';
import {useState} from 'react';
import {X} from 'lucide-react';
import {
	useGlobalStore,
	useUpdateUserRoleModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import ButtonLoader from '@/components/loader/button-loader';
import {useRouter} from 'next/navigation';

const UpdateUserRoleModal = () => {
	const router = useRouter();
	const {user, updateUser, updateCurrentAccountTab} = useGlobalStore();

	const {onClose} = useUpdateUserRoleModalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/update-user-role`,
				{role: 'FARMER'},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);
			const cookieUpdate = await axios.patch(
				'/api/auth/update-cookies',
				data.data
			);
			await updateUser(cookieUpdate.data);

			// console.log('[DATA] :: ', data);

			setLoading(false);

			toast.success('Success');

			// close modal
			onClose();

			updateCurrentAccountTab('Products');
			router.push('/account');
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[DELETE-PRODUCT-ERROR]', _error);

			toast.error('An error occurred');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[40%] bg-white py-2 px-4  overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='te'>Update Role</h1>

					<Button
						type='button'
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex items-center justify-center w-full py-10'>
					<p>Are you sure you want to become a seller?</p>
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
							type='button'
							variant={'outline'}
							onClick={handleSubmit}
							className='w-full md:w-[200px] bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							Submit
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default UpdateUserRoleModal;
