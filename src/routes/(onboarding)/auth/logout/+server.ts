import { loginRoute } from '$lib/auth/routes';

export async function GET({ locals: { supabase, safeGetSession } }): Promise<Response> {
	const { session } = await safeGetSession();

	if (session) {
		await supabase.auth.signOut();
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: loginRoute
		}
	});
}
