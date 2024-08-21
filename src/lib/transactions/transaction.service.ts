import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '$lib/auth/database.types';

export async function createTransaction(
	supabase: SupabaseClient<Database>,
	{ userId, amount }: { userId: string; amount: number }
) {
	const { data, error } = await supabase
		.from('transactions')
		.insert([
			{
				user_id: userId,
				amount
			}
		])
		.select();

	return { data, error };
}

export async function getTransactions(
	supabase: SupabaseClient<Database>,
	userId: string,
	page = 0,
	orderBy = 'created_at',
	orderByDesc = true,
	statuses: string[] = [],
	startDate = '',
	endDate = '',
	search = ''
) {
	let builder = supabase.from('transactions').select(
		`
		id,
		amount,
		created_at,
		status
	`
	);

	if (statuses.length) {
		builder = builder.filter('status', 'in', `("${statuses.join('","')}")`);
	}

	if (startDate) {
		builder = builder.gte('created_at', new Date(startDate).toISOString());
	}

	if (endDate) {
		builder = builder.lte('created_at', new Date(endDate).toISOString());
	}

	const { data, error } = await builder
		.order(orderBy, { ascending: !orderByDesc })
		.range(page * 30, (page + 1) * 30)
		.eq('user_id', userId);

	const finalData =
		data?.map((d) => ({ ...d, createdAt: d.created_at, status: d.status || 'pending' })) || [];

	return { data: finalData, error };
}
