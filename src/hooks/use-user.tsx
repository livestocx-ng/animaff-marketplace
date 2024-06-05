'use client';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import { useGlobalStore } from '@/store/use-global-store';

export function useUserHook() {
	const {user, updateUser} = useGlobalStore();
	const [error, setError] = useState<AxiosError | null>(null);
	const [isUserSuccess, setIsUserSuccess] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			try {
				// if (user) return;

				const {data} = await axios.get('/api/auth/account');

				updateUser(data);

				setError(null);

				setIsUserSuccess(true);
			} catch (error) {
				const _error = error as AxiosError;

				updateUser(null);

				setError(_error);

				setIsUserSuccess(false);
			}
		})();
	}, []);

	return {user, updateUser, error, isUserSuccess};
}
