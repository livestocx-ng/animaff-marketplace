export function createBlobImageUrls(files: File[]) {
	const blobUrls: string[] = [];

	files.forEach((file) => {
		if (file.type.includes('image')) {
			const blobUrl = URL.createObjectURL(file);
			blobUrls.push(blobUrl);
		}
	});

	return blobUrls;
}

export function getFilesTypeCount(files: File[], type: string) {
	const filteredFiles = files.filter((file) => file.type.includes(type));

	return filteredFiles.length;
}
