import { type RequestEvent } from '@sveltejs/kit';
import type { Cookie } from 'lucia';

import { loginRoute } from '$lib/auth/routes';
import { inValidateSession } from '$lib/auth/services';

export async function GET(event: RequestEvent): Promise<Response> {
	if (event.locals.session) {
		const cookieResponse = await inValidateSession(event.locals.session.id);

		const sessionCookie = JSON.parse(cookieResponse) as Cookie;

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: loginRoute
		}
	});
}
