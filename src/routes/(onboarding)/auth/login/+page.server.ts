import { fail } from '@sveltejs/kit';

import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

import { api } from '$convex/_generated/api';
import { formSchema } from '$lib/auth/login/schema';
import { client } from '$lib/convex';
import { resend } from '$routes/services/email.service';

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

		const { email } = form.data;

		// TODO: handle errors
		const { magicLink } = await client.mutation(api.users.sendEmailLoginLink, {
			email
		});

		if (!magicLink) {
			return fail(401, {
				form,
				error: 'Failed to create login link'
			});
		}

		const { error } = await resend.emails.send({
			from: process.env.RESEND_API_FROM_EMAIL || 'onboarding@resend.dev',
			to: email,
			subject: 'No reply - Login link!',
			html: `<a href="${magicLink}">${magicLink}</a>`
		});

		if (error) {
			return fail(401, {
				form,
				error: 'Failed to send email'
			});
		}

		console.log('Login link:', magicLink);

		return { form };
	}
};
