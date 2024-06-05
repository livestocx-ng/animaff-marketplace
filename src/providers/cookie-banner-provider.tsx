'use client';
import Image from 'next/image';
import {Cookie} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';
import {getLocalStorage, setLocalStorage} from '@/lib/localstorageHelper';

export default function CookieBannerProvider() {
	const {updateCookieConsentStatus} = useGlobalStore();

	const [cookieConsent, setCookieConsent] = useState<
		true | false | null | undefined
	>(undefined);

	useEffect(() => {
		const storedCookieConsent = getLocalStorage('livestocx_cookie_consent');

		// console.log(storedCookieConsent);

		setCookieConsent(storedCookieConsent);
		setLocalStorage('livestocx_cookie_consent', storedCookieConsent);
	}, []);

	useEffect(() => {
		const newValue = cookieConsent ? 'granted' : 'denied';

		window.gtag('consent', 'update', {
			analytics_storage: 'granted',
			// analytics_storage: newValue,
		});

		if (cookieConsent === true || cookieConsent === false) {
			setLocalStorage('livestocx_cookie_consent', cookieConsent);
		}

		//For Testing
		// console.log('Cookie Consent: ', cookieConsent);
	}, [cookieConsent]);

	return (
		<>
			{cookieConsent === null && (
				<div
					className={`${
						cookieConsent === true
							? 'hidden'
							: cookieConsent === false
							? 'hidden'
							: 'fixed'
					} bottom-0 left-0 right-0 z-[6] md:h-[40%] bg-[#ffffff20] backdrop-blur-sm grid place-content-center`}
				>
					<div
						className={`my-10 mx-auto max-w-[90%] flex flex-col md:flex-row px-3 md:px-4 py-6 border border-slate-400 justify-between items-center gap-4 bg-white text-black rounded shadow-lg`}
					>
						<div className='flex flex-col md:flex-row items-center space-x-4 pr-4'>
							<Image
								alt='cookie-logo'
								width={50}
								height={50}
								unoptimized={true}
								src={'/icon__cookies.svg'}
								className='object-fill'
							/>
							<p className='text-sm text-justify'>
								{/* Our website use cookies. By continuing navigating, we
						assume your permission to deploy cookies as detailed in
						our Privacy Policy. */}
								At Livestocx, we hold your privacy in the
								highest regard. Our website, by default,
								utilizes Google Analytics along with strictly
								necessary and functional cookies to ensure
								secure operation and enhance your experience
								with our content and services. <br />
								By selecting "Allow" you are giving consent to
								activate performance, marketing, and analysis
								cookies, including those from third-party
								suppliers.
							</p>
						</div>

						<div className='flex flex-col md:flex-row gap-2 w-full md:w-fit px-4 md:px-0'>
							<button
								onClick={() => {
									setCookieConsent(true);
									updateCookieConsentStatus(true);
								}}
								className='w-full md:w-fit bg-main px-5 py-3 md:py-2 text-white rounded-full text-sm flex justify-center items-center space-x-2'
							>
								<Cookie className='h-5 w-5' />{' '}
								<p className='text-sm'>Allow</p>
							</button>
							<button
								onClick={() => {
									setCookieConsent(true);
									updateCookieConsentStatus(true);
								}}
								className='w-full md:w-fit bg-white border px-5 py-3 md:py-2 text-black rounded-full border-gray-900 text-sm'
							>
								Decline
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
