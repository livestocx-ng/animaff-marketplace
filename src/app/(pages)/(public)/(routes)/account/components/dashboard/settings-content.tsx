import React from 'react';
import {User} from '@/types/types';
import AccountSettings from './settings/account-settings';
import BillingSettings from './settings/billing-settings';
import PasswordSettings from './settings/password-settings';
import VendorSettings from './settings/vendor-settings';

interface SettingsContentProps {
	user: User | null;
}

const SettingsContent = () => {
	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			<AccountSettings />

			{/* <BillingSettings/> */}

			<VendorSettings/>

			<PasswordSettings/>
		</div>
	);
};

export default SettingsContent;
