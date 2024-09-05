import { ConvexError } from 'convex/values';

import { ConvexErrorType } from '../types';

export function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {
		throw new ConvexError<ConvexErrorType>({
			message: 'Invalid email format!',
			code: 400,
			severity: 'medium'
		});
	}
}
