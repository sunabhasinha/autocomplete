export const useDebounce = (fn: any, delay: number) => {
	let timer: number | null = null;

	return (...args: any) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};
