import { getQueryString } from '$lib/helpers';
import { fetchClient } from '$lib/services/fetch-handler';
import type { UrlQuery } from '$lib/types';

import type { Transaction, TransactionStatus } from './types';

export async function fetchTransactions({
	page = 0,
	orderBy = 'created_at',
	orderByDesc = true,
	statuses = undefined,
	startDate = undefined,
	endDate = undefined,
	search = ''
}: UrlQuery & { statuses?: TransactionStatus[] } = {}) {
	const queryString = getQueryString({
		page,
		orderBy,
		orderByDesc,
		startDate,
		endDate,
		statuses,
		search
	});

	// console.log('queryString', queryString);

	return fetchClient.get<Transaction['Row'][]>(`/api/v1/transactions?${queryString}`);
}
