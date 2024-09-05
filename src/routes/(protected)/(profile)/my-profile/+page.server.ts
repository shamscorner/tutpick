import { isEmptyObject } from '@shamscorner/shared';
import { fail, redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { formSchema, formSchemaChangeEmail } from '$lib/auth/my-profile/schema';
import type { User } from '$lib/auth/types';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		redirect(303, '/');
	}

	const user: User = {
		id: session.user.id,
		created: session.user.created_at,
		updated: session.user.updated_at,
		avatar: session.user.user_metadata.avatar_url,
		email: session.user.email,
		name: session.user.user_metadata.full_name
	};

	return {
		form: await superValidate(zod(formSchema)),
		formChangeEmail: await superValidate(zod(formSchemaChangeEmail)),
		user
	};
};

export const actions: Actions = {
	updateProfile: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { safeGetSession, supabase } = event.locals;
		const { session } = await safeGetSession();

		if (!session) {
			return fail(403, {
				form,
				error: 'Forbidden'
			});
		}

		const { name } = form.data;

		const { error: errorResponse } = await supabase.from('profiles').upsert({
			id: session.user.id,
			full_name: name,
			updated_at: new Date()
		});

		if (errorResponse && !isEmptyObject(errorResponse)) {
			const { code, message } = errorResponse;
			return fail(code ? +code : 403, {
				form,
				error: message
			});
		}

		return { form };
	},

	updateEmail: async (event) => {
		const form = await superValidate(event, zod(formSchemaChangeEmail));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { safeGetSession, supabase } = event.locals;
		const { session } = await safeGetSession();

		if (!session) {
			return fail(403, {
				form,
				error: 'Forbidden'
			});
		}

		const { email } = form.data;

		const { error: errorResponse } = await supabase.auth.updateUser({
			email
		});

		if (errorResponse && !isEmptyObject(errorResponse)) {
			const { code, message } = errorResponse;
			return fail(code ? +code : 403, {
				form,
				error: message
			});
		}

		return { form };
	}
};
