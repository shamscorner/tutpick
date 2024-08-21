import { isEmptyObject } from '@shamscorner/shared';
import { fail } from '@sveltejs/kit';

import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

import { formSchema } from '$lib/auth/login/schema';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, browserHash, landingPage, referralSiteUrl, isIncognitoMode } = form.data;

		const { supabase } = event.locals;

		const { error: errorResponse } = await supabase.auth.signInWithOtp({ email });

		if (errorResponse && !isEmptyObject(errorResponse)) {
			const { code, message } = errorResponse;

			return fail(code ? +code : 401, {
				form,
				error: message
			});
		}

		// TODO: update users data to add the above meta data

		return { form };
	}
};
