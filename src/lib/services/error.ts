import { ConvexError } from 'convex/values';

import type { apiError } from '$lib/types';

export const unexpectedErrorMessage = 'Unexpected error occurred!';

export function parseErrorFromResponse(error) {
	return error instanceof ConvexError ? (error.data as apiError) : unexpectedErrorMessage;
}

export function parseErrorMessage(error?: string | apiError) {
	if (typeof error === 'string') return error;
	return error?.message || unexpectedErrorMessage;
}
