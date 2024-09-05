import { ConvexError } from 'convex/values';

import type { apiError } from '$lib/types';

export function parseErrorFromResponse(error) {
	return error instanceof ConvexError ? (error.data as apiError) : 'Unexpected error occurred!';
}
