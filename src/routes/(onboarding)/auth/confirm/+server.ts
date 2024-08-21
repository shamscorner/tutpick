import { isEmptyObject } from '@shamscorner/shared';
import type { EmailOtpType } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

import { appHomeRoute } from '$lib/auth/routes';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? appHomeRoute;

	/**
	 * Clean up the redirect URL by deleting the Auth flow parameters.
	 *
	 * `next` is preserved for now, because it's needed in the error case.
	 */
	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');

	if (token_hash && type) {
		const { error: errorResponse } = await supabase.auth.verifyOtp({ type, token_hash });

		if (isEmptyObject(errorResponse)) {
			redirectTo.searchParams.delete('next');
			redirect(303, redirectTo);
		}
	}

	error(403, {
		message: 'Invalid or expired token'
	});
};
