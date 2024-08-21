import { redirect } from '@sveltejs/kit';

import { loginRoute } from '$lib/auth/routes';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	redirect(301, loginRoute);
};
