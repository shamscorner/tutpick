export const loginRoute = '/auth/login';
export const registerRoute = '/auth/register';
export const logoutRoute = '/auth/logout';
export const githubAuthRoute = '/auth/github';
export const googleAuthRoute = '/auth/google';
export const twoFARoute = '/auth/two-factor';
export const aboutRoute = '/about';
export const settingsRoute = '/settings';
export const myProfileRoute = '/my-profile';
export const howToRoute = '/how-to';
export const transactionsRoute = '/transactions';
export const savedCardsRoute = '/saved-cards';

/**
 * An array of routes that are used for authentication
 * These routes will redirect to the login page if the user is not authenticated
 */
export const authRoutes = [loginRoute, registerRoute, githubAuthRoute, googleAuthRoute, twoFARoute];

/**
 * An array of route ids that are used for authentication
 * These route ids will redirect to the login page if the user is not authenticated
 */
export const authRouteIds = authRoutes.map((route) => `/(onboarding)${route}`);

/**
 * The home route to redirect to if the user is authenticated
 */
export const appHomeRoute = '/dashboard';

export function isDevRoutes(currentRouteId: string) {
	return currentRouteId && currentRouteId.includes('/dev');
}

export function isProtectedRoutes(currentRouteId: string) {
	return currentRouteId && currentRouteId.includes('/(protected)/');
}
