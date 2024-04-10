export const useThrottle = (fn, delay) => {
	let flag = true;
	return (...args) => {
		if (flag) {
			fn.apply(this, ...args);
			flag = false;
			setTimeout(() => {
				flag = true;
			}, delay);
		}
	};
};
