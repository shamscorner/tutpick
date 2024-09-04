import type { RequestEvent } from '@sveltejs/kit';

import { api } from '$convex/_generated/api';
import { client } from '$lib/convex';

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
		await client.mutation(api.users.validateLoginToken, {
			email,
			token,
			id: tokenId
		});
	} catch (e: any) {
		return new Response(e.data, {
			status: 400
		});
	}

	return await passwordLessAuthHandler(event, {
		email
	});
}
