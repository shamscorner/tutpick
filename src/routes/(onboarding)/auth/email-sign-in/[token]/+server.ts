import type { RequestEvent } from '@sveltejs/kit';

import { validateLoginToken } from '$lib/auth/services';

import { passwordLessAuthHandler } from '../../services/password-less-auth';

export async function GET(event: RequestEvent) {
	const token = event.params.token;
	const email = event.url.searchParams.get('email');
	const tokenId = event.url.searchParams.get('id');

	if (!token || !email || !tokenId) {
		return new Response('Invalid login link!', {
			status: 400
		});
	}

	try {
		await validateLoginToken(email, token, tokenId);
	} catch (e: any) {
		return new Response(e.data, {
			status: 400
		});
	}

	return await passwordLessAuthHandler(event, {
		email
	});
}
