import { type RequestEvent } from '@sveltejs/kit';
import type { Cookie } from 'lucia';

import { loginRoute } from '$lib/auth/routes';
import { inValidateSession } from '$lib/auth/services';

export async function GET(event: RequestEvent): Promise<Response> {
	if (event.locals.session) {
		const { data } = await inValidateSession(event.locals.session.id);

		if (data) {
			const sessionCookie = JSON.parse(data) as Cookie;

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: loginRoute
		}
	});
}
