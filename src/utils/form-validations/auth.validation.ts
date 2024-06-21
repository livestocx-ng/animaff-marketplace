interface SigninDto {
	email: string;
	password: string;
}

interface VendorProfileDto {
	name: string;
	email: string;
	address: string;
	phoneNumber: string;
}

interface PremiumSubscriptionCheckoutDto extends VendorProfileDto {
	slug: string;
}

interface SignupDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	location: string;
	businessName: string;
	businessSlug: string;
	businessAddress: string;
	businessState: string;
	businessCity: string;
	phoneNumber: string;
	zipPostalCode: string;
	acceptedTerms: boolean;
	confirmPassword: string;
	role: 'FARMER' | 'CUSTOMER';
}

const sellerSlugRegEX = new RegExp(/^[a-z]+$/);

const zipPostalCodeRegEX = new RegExp(/^\d{5}$/);

const phoneRegEX = new RegExp(/^\d{10}$/);

const isNumberRegEX = new RegExp(/^[0-9]+$/);

const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

const passwordRegEX = new RegExp(
	'(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^ws]).{8,60}$'
);

export function ValidateSigninFormData(formData: SigninDto): string {
	let message = '';

	if (!formData.email) {
		return (message = 'Email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}
	if (!formData.password) {
		return (message = 'Password is required.');
	}

	return message;
}

export function ValidateSignupFormData(formData: SignupDto): string {
	let message = '';

	if (!formData.firstName) {
		return (message = 'First name is required.');
	}
	if (!formData.lastName) {
		return (message = 'Last name is required.');
	}
	if (!formData.email) {
		return (message = 'Email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}
	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!phoneRegEX.test(formData.phoneNumber)) {
		return (message = 'Phone number must be at least 10 characters.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}
	if (!formData.password) {
		return (message = 'Password is required.');
	}
	if (!formData.confirmPassword) {
		return (message = 'Confirm password is required.');
	}
	if (formData.password !== formData.confirmPassword) {
		return (message = 'Passwords do match.');
	}
	if (!passwordRegEX.test(formData.password)) {
		return (message =
			'Password must be at least 8 characters, include a capital letters and small letters.');
	}

	if (!formData.zipPostalCode) {
		return (message = 'Zip/postal code is required.');
	}

	if (!zipPostalCodeRegEX.test(formData.zipPostalCode)) {
		return (message = 'Zip code must be at least 5 digits.');
	}

	// if (formData.role === 'CUSTOMER' && !formData.location) {
	// 	return (message = 'Location is required.');
	// }

	if (formData.role === 'FARMER' && !formData.businessName) {
		return (message = 'Business name is required.');
	}
	// if (!formData.businessSlug) {
	// 	return (message = 'Business slug is required.');
	// }
	// if (!sellerSlugRegEX.test(formData.businessSlug)) {
	// 	return (message =
	// 		'Invalid business slug, use lowercase characters without space.');
	// }
	if (formData.role === 'FARMER' && !formData.businessAddress) {
		return (message = 'Business address is required.');
	}
	// if (formData.role === 'FARMER' && !formData.businessState) {
	// 	return (message = 'Business state is required.');
	// }
	// if (formData.role === 'FARMER' && !formData.businessCity) {
	// 	return (message = 'Business city is required.');
	// }

	if (formData.acceptedTerms === false) {
		return (message =
			'Please accept our terms of service and privacy policy.');
	}

	return message;
}

export function ValidateVendorProfileFormData(
	formData: VendorProfileDto
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Business name is required.');
	}

	if (!formData.email) {
		return (message = 'Business email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}

	if (!formData.address) {
		return (message = 'Business address is required.');
	}

	// if (!formData.slug) {
	// 	return (message = 'Business slug is required.');
	// }
	// if (!sellerSlugRegEX.test(formData.slug)) {
	// 	return (message =
	// 		'Invalid business slug, use lowercase characters without space.');
	// }

	// if (!formData.state) {
	// 	return (message = 'Business state is required.');
	// }

	// if (!formData.city) {
	// 	return (message = 'Business city is required.');
	// }

	return message;
}

export function ValidatePremiumSubscriptionCheckoutFormData(
	formData: PremiumSubscriptionCheckoutDto
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Business name is required.');
	}

	if (!formData.email) {
		return (message = 'Business email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}

	if (!formData.address) {
		return (message = 'Business address is required.');
	}

	if (!formData.slug) {
		return (message = 'Business domain handle is required.');
	}
	if (!sellerSlugRegEX.test(formData.slug)) {
		return (message =
			'Invalid domain handle, use lowercase characters without space.');
	}

	// if (!formData.state) {
	// 	return (message = 'Business state is required.');
	// }

	// if (!formData.city) {
	// 	return (message = 'Business city is required.');
	// }

	return message;
}
