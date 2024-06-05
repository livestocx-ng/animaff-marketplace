interface UpdateProfileDto {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	avatar: File | null;
	avatarUrl: string;
}

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

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}

	if (formData.avatar && typeof formData.avatar !== 'object') {
		return (message = 'Uploaded avatar type is not a valid image.');
	}

	return message;
}
