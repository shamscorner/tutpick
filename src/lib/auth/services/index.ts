import { api } from '$convex/_generated/api';
import { client } from '$lib/convex';

export async function validateSession(sessionId: string) {
	return await client.mutation(api.core.users.validateSession, { sessionId });
}

export async function validateLoginToken(email: string, token: string, tokenId: string) {
	return await client.mutation(api.core.users.validateLoginToken, {
		email,
		token,
		id: tokenId
	});
}

export async function sendEmailLoginLink(email: string) {
	return await client.mutation(api.core.users.sendEmailLoginLink, {
		email
	});
}

export async function inValidateSession(sessionId: string) {
	return await client.mutation(api.core.users.invalidateSession, {
		sessionId
	});
}

export async function performPasswordLessLogin({
	email,
	provider = 'email',
	name,
	username,
	avatar
}: {
	email: string;
	provider?: string;
	name?: string;
	username?: string;
	avatar?: string;
}) {
	return await client.mutation(api.core.users.performPasswordLessLogin, {
		email,
		provider,
		name,
		username,
		avatar,
		sessionId: null
	});
}
