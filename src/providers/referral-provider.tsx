'use client';
import {useEffect, useState} from 'react';
import {getLocalStorage, setLocalStorage} from '@/lib/localstorageHelper';
import {useGlobalStore, useReferralModalStore} from '@/hooks/use-global-store';
import UserReferralModal from '@/components/modals/referrals/user-referral-modal';

export default function ReferralProvider() {
	const {user} = useGlobalStore();

	useEffect(() => {
		const referralConsent = getLocalStorage('animaff_referral_banner');

		setLocalStorage('animaff_referral_banner', referralConsent);
	}, [user]);

	return null;
}
