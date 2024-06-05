interface UpdatePasswordDto {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export function ValidateUpdatePasswordFormData(
	formData: UpdatePasswordDto
): string {
	let message = '';

	if (!formData.currentPassword) {
		return (message = 'Current password is required.');
	}

	if (!formData.newPassword) {
		return (message = 'New password is required.');
	}

	if (!formData.confirmPassword) {
		return (message = 'Confirm password is required.');
	}

	if (formData.newPassword !== formData.confirmPassword) {
		return (message = 'Passwords do not match!');
	}

	return message;
}
