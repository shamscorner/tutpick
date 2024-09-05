import { type RequestEvent } from '@sveltejs/kit';
import type { Cookie } from 'lucia';

import { api } from '$convex/_generated/api';
import { loginRoute } from '$lib/auth/routes';
import { client } from '$lib/convex';

export async function GET(event: RequestEvent): Promise<Response> {
	if (event.locals.session) {
		const cookieResponse = await client.mutation(api.core.users.invalidateSession, {
			sessionId: event.locals.session.id
		});

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
