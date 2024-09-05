import { type RequestEvent } from '@sveltejs/kit';
import type { Cookie, Session } from 'lucia';

import { appHomeRoute } from '$lib/auth/routes';
import { performPasswordLessLogin } from '$lib/auth/services';

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
		loginResponse = await performPasswordLessLogin({
			email,
			provider,
			name,
			username,
			avatar
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
