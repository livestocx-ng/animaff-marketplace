interface UpdateVendorProfileDto {
	name: string;
	state: string;
	city: string;
	address: string;
	avatar: File | null;
	avatarUrl: string;
	email: string;
	phoneNumber: string;
	zipPostalCode: string;
	isUpdated: boolean;
}

const zipPostalCodeRegEX = new RegExp(/^\d{5}$/);

const phoneRegEX = new RegExp(/^\d{10}$/);

const isNumberRegEX = new RegExp(/^[0-9]+$/);

const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

export function ValidateUpdateVendorProfileFormData(
	formData: UpdateVendorProfileDto
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Vendor name is required.');
	}

	if (!formData.state) {
		return (message = 'Vendor state is required.');
	}

	if (!formData.city) {
		return (message = 'Vendor city is required.');
	}

	if (!formData.address) {
		return (message = 'Vendor address is required.');
	}

	if (!formData.email) {
		return (message = 'Email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}

	if (!formData.zipPostalCode) {
		return (message = 'Zip/postal code is required.');
	}
	if (!zipPostalCodeRegEX.test(formData.zipPostalCode)) {
		return (message = 'Zip/postal code must be at least 5 digits.');
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

	if (!formData.isUpdated && !formData.avatar) {
		return (message = 'Avatar is required.');
	}
	if (!formData.isUpdated && typeof formData.avatar !== 'object') {
		return (message = 'Uploaded avatar type is not a valid image.');
	}

	return message;
}
