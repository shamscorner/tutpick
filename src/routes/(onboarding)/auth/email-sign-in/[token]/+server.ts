import { error, type RequestEvent } from '@sveltejs/kit';

import { validateLoginToken } from '$lib/auth/services';
import { parseErrorMessage } from '$lib/services/error';

import { passwordLessAuthHandler } from '../../services/password-less-auth';

export async function GET(event: RequestEvent) {
	const token = event.params.token;
	const email = event.url.searchParams.get('email');
	const tokenId = event.url.searchParams.get('id');

	if (!token || !email || !tokenId) {
		error(400, 'Invalid login link!');
	}

	const { error: tokenError } = await validateLoginToken(email, token, tokenId);

	if (tokenError) {
		error(400, parseErrorMessage(tokenError));
	}

	return await passwordLessAuthHandler(event, {
		email
	});
}
