import { get } from 'svelte/store';
import { isEmptyObject } from '@shamscorner/shared';
import type { RequestEvent } from '@sveltejs/kit';
import { error, redirect } from '@sveltejs/kit';

import LL from '$lib/i18n/i18n-svelte';

export async function GET(event: RequestEvent) {
	const { supabase } = event.locals;

	const { data, error: errorResponse } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${event.url.origin}/auth/google/callback`,
			queryParams: {
				access_type: 'offline',
				prompt: 'consent'
			}
		}
	});

	const $LL = get(LL);

	if (errorResponse && !isEmptyObject(errorResponse)) {
		const { code, message } = errorResponse;

		return error(code ? +code : 403, {
			message: message || $LL.loginPage.errors.failedSignInGoogle()
		});
	}

	if (!data.url) {
		return error(500, {
			message: $LL.loginPage.errors.failedSignInGoogle()
		});
	}

	redirect(302, data.url);
}
