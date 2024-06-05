interface ComplianceDto {
	name: string;
	state: string;
	city: string;
	address: string;
	avatar: File | null;
	identificationDocument: File | null;
	registrationDocument: File | null;
	email: string;
	facebookUrl?: string;
	instagramUrl?: string;
	twitterUrl?: string;
	websiteUrl?: string;
	phoneNumber: string;
	isUpdated: boolean;
}

const isNumberRegEX = new RegExp(/^[0-9]+$/);
const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

export function ValidateComplianceFormData(formData: ComplianceDto): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Business name is required.');
	}

	if (!formData.email) {
		return (message = 'Business email is required.');
	}

	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email address.');
	}

	if (!formData.state) {
		return (message = 'State is required.');
	}

	if (!formData.city) {
		return (message = 'City is required.');
	}

	if (!formData.address) {
		return (message = 'Business address is required.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Business Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}
	if (
		formData.phoneNumber &&
		(formData.phoneNumber.length <= 10 || formData.phoneNumber.length > 11)
	) {
		return (message = 'Phone number must be at least 11 characters.');
	}

	if (formData.facebookUrl && !formData.facebookUrl.includes('.com')) {
		return (message = 'Invalid facebook url.');
	}

	if (formData.instagramUrl && !formData.instagramUrl.includes('.com')) {
		return (message = 'Invalid instagram url.');
	}

	if (formData.twitterUrl && !formData.twitterUrl.includes('.com')) {
		return (message = 'Invalid twitter url.');
	}

	if (formData.websiteUrl && !formData.websiteUrl.includes('.com')) {
		return (message = 'Invalid website url.');
	}

	if (formData.avatar && typeof formData.avatar !== 'object') {
		return (message = 'Uploaded business logo type is not a valid image.');
	}

	if (!formData.identificationDocument) {
		return (message = 'Identification document is required.');
	}
	if (
		formData.identificationDocument &&
		typeof formData.identificationDocument !== 'object'
	) {
		return (message =
			'Uploaded identification document type is not a valid image.');
	}

	if (
		formData.registrationDocument &&
		typeof formData.registrationDocument !== 'object'
	) {
		return (message =
			'Uploaded registration document type is not a valid image.');
	}

	return message;
}
