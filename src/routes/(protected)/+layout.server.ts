import { redirect } from '@sveltejs/kit';

import { loginRoute } from '$lib/auth/routes';

import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		redirect(303, loginRoute);
	}

	return { session };
};
