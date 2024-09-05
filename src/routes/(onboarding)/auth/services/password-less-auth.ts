import { error, type RequestEvent } from '@sveltejs/kit';
import type { Cookie, Session } from 'lucia';

import { appHomeRoute } from '$lib/auth/routes';
import { performPasswordLessLogin } from '$lib/auth/services';
import { parseErrorMessage } from '$lib/services/error';

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

	const { data: loginResponse, error: loginError } = await performPasswordLessLogin({
		email,
		provider,
		name,
		username,
		avatar
	});

	if (loginError || !loginResponse) {
		error(400, parseErrorMessage(loginError));
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
