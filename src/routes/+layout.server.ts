import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { session, user } = await locals.safeGetSession();

	return {
		session,
		user,
		cookies: cookies.getAll(),
		locale: locals.locale
	};
};
