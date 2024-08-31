import type { RequestEvent } from '@sveltejs/kit';

import { passwordLessAuthHandler } from '../../services/password-less-auth';

export async function GET(event: RequestEvent) {
	const token = event.params.token;
	const email = event.url.searchParams.get('email');
	const tokenId = event.url.searchParams.get('id');

	console.log('Token:', token);
	console.log('Email:', email);
	console.log('Token ID:', tokenId);

	if (!token || !email || !tokenId) {
		return new Response(null, {
			status: 400
		});
	}

	// TODO: validate token
	// TODO: after successful validation, delete token

	return await passwordLessAuthHandler(event, {
		email
	});
}
