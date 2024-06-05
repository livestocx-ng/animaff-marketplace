import 'client-only';

export function getLocalStorage(key: string) {
	const stickyValue = localStorage.getItem(key);

	// console.log(stickyValue);

	return stickyValue !== null && stickyValue !== 'undefined'
		? JSON.parse(stickyValue)
		: null;
}

export function setLocalStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}
