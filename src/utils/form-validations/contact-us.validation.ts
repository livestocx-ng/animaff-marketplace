interface ContactUsDto {
	email: string;
	firstName: string;
	lastName: string;
	message: string;
}

const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

export function ValidateContactUsFormData(formData: ContactUsDto): string {
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

	if (!formData.message) {
		return (message = 'Message is required.');
	}

	return message;
}
