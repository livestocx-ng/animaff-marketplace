interface UpdateBillingDto {
	firstName: string;
	lastName: string;
	company?: string;
	address: string;
	state: string;
	city: string;
	email: string;
	phoneNumber: string;
}

export function ValidateUpdateBillingFormData(
	formData: UpdateBillingDto
): string {
	let message = '';

	if (!formData.firstName) {
		return (message = 'Billing first name is required.');
	}

	if (!formData.lastName) {
		return (message = 'Billing last name is required.');
	}

	if (!formData.address) {
		return (message = 'Billing address is required.');
	}

	if (!formData.state) {
		return (message = 'Billing state is required.');
	}

	if (!formData.city) {
		return (message = 'Billing city is required.');
	}

	if (!formData.email) {
		return (message = 'Billing email is required.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Billing phone number is required.');
	}

	return message;
}
