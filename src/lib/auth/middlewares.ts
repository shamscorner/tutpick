import { redirect } from '@sveltejs/kit';
import type { Cookie, Session, User } from 'lucia';

import { api } from '$convex/_generated/api';
import { client } from '$lib/convex';

import { appHomeRoute, authRouteIds, isDevRoutes, isProtectedRoutes, loginRoute } from './routes';

export async function protectRoutes({ event, resolve }) {
	const currentRouteId = event.route.id;

	// exclude all routes that starts with /dev
	if (isDevRoutes(currentRouteId)) return resolve(event);

	const isLoggedIn = !!event.locals.user;

	if (isProtectedRoutes(currentRouteId) && !isLoggedIn) {
		throw redirect(302, loginRoute);
	}

	const isAuthRoute = authRouteIds.includes(currentRouteId);

	if (isAuthRoute && isLoggedIn) {
		throw redirect(302, appHomeRoute);
	}

	return resolve(event);
}

export async function initLuciaAuth({ event, resolve }) {
	const sessionId = event.cookies.get('auth_session');

	console.log('sessionId', sessionId);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	try {
		const responseJson = await client.query(api.users.getSession, { sessionId });
		console.log('responseJson', responseJson); // TODO: error check convex log

		const { user, session, cookie } = JSON.parse(responseJson) as {
			session: Session;
			user: User;
			cookie: Cookie;
		};

		if (!user || !session || !cookie) {
			throw new Error('Invalid session');
		}

		event.cookies.set(cookie.name, cookie.value, {
			path: '.',
			...cookie.attributes
		});

		event.locals.user = user;
		event.locals.session = session;
	} catch {
		event.locals.user = null;
		event.locals.session = null;
	}

	return resolve(event);
}
