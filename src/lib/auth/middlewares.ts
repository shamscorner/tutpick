import { redirect } from '@sveltejs/kit';

import { appHomeRoute, authRouteIds, isDevRoutes, isProtectedRoutes, loginRoute } from './routes';

export async function protectRoutes({ event, resolve }) {
	const currentRouteId = event.route.id;

	if (isDevRoutes(currentRouteId)) return resolve(event);

	const { safeGetSession } = event.locals;
	const { session } = await safeGetSession();

	const isLoggedIn = !!session;

	if (isProtectedRoutes(currentRouteId) && !isLoggedIn) {
		throw redirect(302, loginRoute);
	}

	const isAuthRoute = authRouteIds.includes(currentRouteId);

	if (isAuthRoute && isLoggedIn) {
		throw redirect(302, appHomeRoute);
	}

	return resolve(event);
}
