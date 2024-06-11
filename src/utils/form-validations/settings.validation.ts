interface UpdateProfileDto {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	avatar: File | null;
	avatarUrl: string;
}

const phoneRegEX = new RegExp(/^\d{10}$/);

const isNumberRegEX = new RegExp(/^[0-9]+$/);

const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

export function ValidateUpdateProfileFormData(
	formData: UpdateProfileDto
): string {
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

	if (formData.avatar && typeof formData.avatar !== 'object') {
		return (message = 'Uploaded avatar type is not a valid image.');
	}

	return message;
}
