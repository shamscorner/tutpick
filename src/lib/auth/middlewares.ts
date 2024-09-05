import { redirect } from '@sveltejs/kit';
import type { Cookie, Session, User } from 'lucia';

import { appHomeRoute, authRouteIds, isDevRoutes, isProtectedRoutes, loginRoute } from './routes';
import { validateSession } from './services';

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

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	try {
		const responseJson = await validateSession(sessionId);

		const { session, user, cookie } = JSON.parse(responseJson) as {
			session: Session;
			user: User;
			cookie: Cookie | undefined;
		};

		if (session && session.fresh && cookie) {
			event.cookies.set(cookie.name, cookie.value, {
				path: '.',
				...cookie.attributes
			});
		}

		if (!session && cookie) {
			event.cookies.set(cookie.name, cookie.value, {
				path: '.',
				...cookie.attributes
			});
		}

		event.locals.user = user;
		event.locals.session = session;
	} catch {
		event.locals.user = null;
		event.locals.session = null;
	}

	return resolve(event);
}
