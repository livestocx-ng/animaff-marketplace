'use client';
import {User} from '@/types/types';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useReducer, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import FormPasswordInput from '@/components/input/form-password-input';
import {ValidateUpdatePasswordFormData} from '@/utils/form-validations/password.validation';

interface PasswordSettingsProps {
	user: User | null;
}

type FormData = {
	newPassword: string;
	confirmPassword: string;
	currentPassword: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	newPassword: '',
	confirmPassword: '',
	currentPassword: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const PasswordSettings = () => {
	const {user} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError = ValidateUpdatePasswordFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError);
			}

			// console.log('[UPDATE-PASSWORD-PAYLOAD] :: ', formData);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/update-password`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			// console.log('[PASSWORD] :: ', data);

			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				},
			});

			toast.success('Password updated!', {className: 'text-sm'});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-PASSWORD-ERROR]', _error);

			toast.error('Error', {className: 'text-sm'});
		}
	};

	return (
		<div className='w-full py-3 flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Password Settings</h1>

			<div className='flex items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-full flex flex-col space-y-3'
				>
					<div className='space-y-1'>
						<p className='text-sm'>Password</p>
						<FormPasswordInput
							name='currentPassword'
							padding='py-4 px-4'
							value={formData.currentPassword}
							handleChange={handleChange}
							placeHolder='Current Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>
					</div>

					<div className='flex flex-col md:flex-row items-center justify-between w-full'>
						<div className='space-y-1 w-full md:w-[48%] mb-3 md:mb-0'>
							<p className='text-sm'>New Password</p>
							<FormPasswordInput
								name='newPassword'
								padding='py-4 px-4'
								value={formData.newPassword}
								handleChange={handleChange}
								placeHolder='New Password'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
							/>
						</div>
						<div className='space-y-1 w-full md:w-[48%]'>
							<p className='text-sm'>Confirm Password</p>
							<FormPasswordInput
								name='confirmPassword'
								padding='py-4 px-4'
								value={formData.confirmPassword}
								handleChange={handleChange}
								placeHolder='Confirm Password'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
							/>
						</div>
					</div>

					{loading ? (
						<Button
							type='button'
							disabled
							className='bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white w-full md:w-fit px-3 rounded'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							className='bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white w-full md:w-fit px-3 rounded'
						>
							Save Changes
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default PasswordSettings;
