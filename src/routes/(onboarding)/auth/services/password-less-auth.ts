import { error, type RequestEvent } from '@sveltejs/kit';

import { api } from '$convex/_generated/api';
import { appHomeRoute } from '$lib/auth/routes';
import { client } from '$lib/convex';

export type PasswordLessUserData = {
	email: string;
	name?: string;
	username?: string;
	avatar?: string;
};

export async function passwordLessAuthHandler(
	event: RequestEvent,
	userData: PasswordLessUserData,
	provider: string = 'email'
) {
	const { email, name, username, avatar } = userData;

	const { session, cookie } = await client.mutation(api.users.performPasswordLessLogin, {
		email,
		provider,
		name,
		username,
		avatar,
		sessionId: null
	});

	console.log('session', session);
	console.log('cookie', cookie);

	// set session
	// await userService.setSession(event, existingUserId, {
	// 	username: userData.username,
	// 	providerId: userData.id,
	// 	provider
	// });

	// redirect to home
	// return new Response(null, {
	// 	status: 302,
	// 	headers: {
	// 		Location: appHomeRoute
	// 	}
	// });
}
