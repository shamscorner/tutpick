import { useDebounce } from '@shamscorner/shared';

export const fetchMoreUsingScrollWindow = (callback: () => Promise<void>) => {
	if (Math.abs(window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) {
		callback();
	}
};

export function addLoadMoreEvent(callback: () => Promise<any>) {
	const { debounce } = useDebounce();

	const onScroll = () => {
		debounce(300, fetchMoreUsingScrollWindow, callback);
	};

	window.addEventListener('scroll', onScroll);

	return () => {
		window.removeEventListener('scroll', onScroll);
	};
}

export function getQueryString(params: Record<string, any>) {
	return Object.keys(params)
		.filter((key) => ![undefined, null, ''].includes(params[key]))
		.map((key) => {
			const value = params[key];
			if (Array.isArray(value)) {
				if (value.length === 0) return '';
				return value
					.map((value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
					.join('&');
			}
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.filter(Boolean)
		.join('&');
}
