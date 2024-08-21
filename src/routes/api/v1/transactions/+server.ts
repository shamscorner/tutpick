import { json, type RequestHandler } from '@sveltejs/kit';

import { getTransactions } from '$lib/transactions/transaction.service';

export const GET: RequestHandler = async ({ locals, url }) => {
	const { supabase, safeGetSession } = locals;

	const { session } = await safeGetSession();

	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const page = url.searchParams.get('page') || '0';
	const orderBy = url.searchParams.get('orderBy') || 'created_at';
	const orderByDesc = url.searchParams.get('orderByDesc') || 'true';
	const statuses = url.searchParams.getAll('statuses') || [];
	const search = url.searchParams.get('search') || '';
	const startDate = url.searchParams.get('startDate') || '';
	const endDate = url.searchParams.get('endDate') || '';

	const { data, error } = await getTransactions(
		supabase,
		session.user.id,
		+page,
		orderBy,
		orderByDesc === 'true',
		statuses,
		startDate,
		endDate,
		search
	);

	return json({ data, error });
};
