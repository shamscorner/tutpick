import { get } from 'svelte/store';
import { isEmptyObject } from '@shamscorner/shared';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

import LL from '$lib/i18n/i18n-svelte';

export async function GET(event: RequestEvent): Promise<Response> {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	const $LL = get(LL);

	if (!code) {
		return error(400, {
			message: $LL.loginPage.errors.failedSignInGoogle()
		});
	}

	const { error: errorResponse } = await supabase.auth.exchangeCodeForSession(code);

	if (errorResponse && !isEmptyObject(errorResponse)) {
		const { code: errCode, message } = errorResponse;
		return error(errCode ? +errCode : 403, {
			message: message || $LL.loginPage.errors.failedSignInGoogle()
		});
	}

	throw redirect(303, `/${next.slice(1)}`);
}
