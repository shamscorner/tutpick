import type { PostgrestError } from '@supabase/supabase-js';

import { PUBLIC_APP_PAGE } from '$env/static/public';

export type GlobalResponseType<T> = {
	message?: string;
	code?: string;
	data?: T;
};

export function parseErrorResponse<T>(error: PostgrestError | null): GlobalResponseType<T> {
	console.log('error', error);

	const { message, code } = error || {};

	return {
		message: message || 'Something went wrong!',
		code: code || '403'
	};
}

export const fetchClient = {
	get: async <R>(
		urlWithoutBase: string,
		headers: Record<string, any> = {},
		noBaseUrl = false
	): Promise<GlobalResponseType<R>> => {
		const url = noBaseUrl ? urlWithoutBase : `${PUBLIC_APP_PAGE}${urlWithoutBase}`;

		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...headers
			}
		};

		const response = await fetch(url, options);

		const responseData = await response.json();

		if (!response.ok) {
			return parseErrorResponse(responseData);
		}

		return responseData;
	},
	post: async <T, R>(
		urlWithoutBase: string,
		data?: T,
		headers: Record<string, any> = {},
		noBaseUrl = false
	): Promise<GlobalResponseType<R>> => {
		const url = noBaseUrl ? urlWithoutBase : `${PUBLIC_APP_PAGE}${urlWithoutBase}`;

		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...headers
			}
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);

		const responseData = await response.json();

		if (!response.ok) {
			return parseErrorResponse(responseData);
		}

		return {
			data: responseData
		};
	},
	put: async <T, R>(
		urlWithoutBase: string,
		data?: T,
		headers: Record<string, any> = {},
		noBaseUrl = false
	): Promise<GlobalResponseType<R>> => {
		const url = noBaseUrl ? urlWithoutBase : `${PUBLIC_APP_PAGE}${urlWithoutBase}`;

		const options: RequestInit = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...headers
			}
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);

		const responseData = await response.json();

		if (!response.ok) {
			return parseErrorResponse(responseData);
		}

		return {
			data: responseData
		};
	}
};
