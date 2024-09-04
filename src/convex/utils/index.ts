import { ConvexError } from 'convex/values';

export function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {
		throw new ConvexError('Invalid email format!');
	}
}
