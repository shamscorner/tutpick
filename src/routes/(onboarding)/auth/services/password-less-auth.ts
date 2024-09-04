import { type RequestEvent } from '@sveltejs/kit';
import type { Cookie, Session } from 'lucia';

import { api } from '$convex/_generated/api';
import { appHomeRoute } from '$lib/auth/routes';
import { client } from '$lib/convex';

export type PasswordLessUserData = {
	email: string;
	name?: string;
	username?: string;
	avatar?: string;
};

export async function passwordLessAuthHandler(
	event: RequestEvent,
	userData: PasswordLessUserData,
	provider: string = 'email'
) {
	const { email, name, username, avatar } = userData;

	let loginResponse = '';

	try {
		loginResponse = await client.mutation(api.users.performPasswordLessLogin, {
			email,
			provider,
			name,
			username,
			avatar,
			sessionId: null
		});
	} catch (e: any) {
		return new Response(e.data, {
			status: 400
		});
	}

	const { cookie } = JSON.parse(loginResponse) as { session: Session; cookie: Cookie };

	event.cookies.set(cookie.name, cookie.value, {
		path: '.',
		...cookie.attributes
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: appHomeRoute
		}
	});
}
