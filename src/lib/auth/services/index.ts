import { api } from '$convex/_generated/api';
import { client } from '$lib/convex';
import { parseErrorFromResponse } from '$lib/services';
import type { apiError } from '$lib/types';

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
	try {
		const data = await client.mutation(api.core.users.sendEmailLoginLink, {
			email
		});
		return { data };
	} catch (e) {
		return { data: null, error: parseErrorFromResponse(e) };
	}
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
