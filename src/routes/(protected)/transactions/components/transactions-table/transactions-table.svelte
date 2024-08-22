<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import {
		addColumnFilters,
		addHiddenColumns,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { useDebounce } from '@shamscorner/shared';
	import type { DateRange } from 'bits-ui';

	import { browser } from '$app/environment';
	import ScrollDownHint from '$lib/components/common/scroll-down-hint.svelte';
	import * as Table from '$lib/components/ui/table';
	import { addLoadMoreEvent } from '$lib/helpers';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { fetchTransactions } from '$lib/transactions/client-transaction.service';
	import type { TransactionStatus } from '$lib/transactions/types';

	import { KEY_TRANSACTIONS_TABLE_HIDDEN_COLUMNS } from './constants';
	import DataTableSkeletonLoader from './data-table-skeleton-loader.svelte';
	import {
		DataTableAmountCell,
		DataTableColumnHeader,
		DataTableCreatedAtCell,
		DataTableStatusCell,
		DataTableToolbar,
		DataTableTransactionIdCell
	} from './index';
	import type { DataItem } from './types';

	const { debounce } = useDebounce();

	const tableData = writable<DataItem[]>([]);
	let page = 0;
	let orderBy = 'created_at';
	let orderByDesc = true;
	let statuses: TransactionStatus[] = [];
	let search = '';
	let dateRange: DateRange | undefined = undefined;
	let loadingState = { state: 0, loading: true };

	async function getTransactions() {
		try {
			let startDate = '';
			let endDate = '';

			if (dateRange) {
				const { year: startYear, month: startMonth, day: startDay } = dateRange.start || {};
				startDate = `${startYear}-${startMonth}-${startDay}`;

				const { year: endYear, month: endMonth, day: endDay } = dateRange.end || {};
				endDate = `${endYear}-${endMonth}-${endDay}`;
			}

			loadingState.loading = true;

			const response = await fetchTransactions({
				page,
				orderBy,
				orderByDesc,
				statuses,
				search,
				startDate,
				endDate
			});

			loadingState = { state: 1, loading: false };

			if (!response.data) return [];

			return response.data.map((transaction) => ({
				id: transaction.id,
				status: transaction.status as string,
				amount: transaction.amount,
				createdAt: transaction.created_at
			}));
		} catch {
			return [];
		}
	}

	async function loadTransactions() {
		const transactions = await getTransactions();
		tableData.set(transactions);
	}

	async function loadMoreTransactions() {
		page++;
		const moreTransactions = await getTransactions();
		tableData.update((data) => [...data, ...moreTransactions]);
	}

	onMount(() => {
		const removeEvent = addLoadMoreEvent(loadMoreTransactions);

		return () => {
			removeEvent();
		};
	});

	const table = createTable(tableData, {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			disableMultiSort: true,
			serverSide: true,
			initialSortKeys: [{ id: 'created_at', order: 'desc' }]
		}),
		filter: addTableFilter({
			serverSide: false // TODO: Implement server-side filtering
		}),
		colFilter: addColumnFilters({
			serverSide: true
		}),
		hide: addHiddenColumns({
			initialHiddenColumnIds: browser
				? JSON.parse(localStorage.getItem(KEY_TRANSACTIONS_TABLE_HIDDEN_COLUMNS) || '[]')
				: []
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: () => {
				return $LL.transactionsPage.table.id();
			},
			id: 'id',
			cell: ({ value, row }) => {
				if (row.isData()) {
					return createRender(DataTableTransactionIdCell, {
						value
					});
				}
				return value;
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'status',
			header: $LL.transactionsPage.table.status(),
			id: 'status',
			cell: ({ value }) => {
				return createRender(DataTableStatusCell, {
					value
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'amount',
			header: $LL.transactionsPage.table.amount(),
			id: 'amount',
			cell: ({ value, row }) => {
				if (row.isData()) {
					return createRender(DataTableAmountCell, {
						value
					});
				}
				return value;
			}
		}),
		table.column({
			accessor: 'createdAt',
			header: $LL.transactionsPage.table.createdAt(),
			id: 'created_at',
			cell: ({ value, row }) => {
				if (row.isData()) {
					return createRender(DataTableCreatedAtCell, {
						value
					});
				}
				return value;
			}
		})
	]);

	const tableModel = table.createViewModel(columns);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = tableModel;
	const { sortKeys } = pluginStates.sort;
	const { filterValues } = pluginStates.colFilter;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;

	$: {
		if ($sortKeys[0]) {
			page = 0;
			orderBy = $sortKeys[0].id || 'created_at';
			orderByDesc = $sortKeys[0].order === 'desc';

			statuses = [...($filterValues.status ? ($filterValues.status as TransactionStatus[]) : [])];
			search = $filterValue || '';

			debounce(400, loadTransactions);
		}
	}

	$: {
		if (browser) {
			localStorage.setItem(KEY_TRANSACTIONS_TABLE_HIDDEN_COLUMNS, JSON.stringify($hiddenColumnIds));
		}
	}

	function onApplyDate(range?: DateRange) {
		dateRange = range;
		debounce(400, loadTransactions);
	}
</script>

{#if loadingState.loading && loadingState.state === 0}
	<DataTableSkeletonLoader />
{:else}
	<DataTableToolbar {tableModel} {onApplyDate} bind:dateRange />
	<div class="my-4 rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id !== 'select' && cell.id !== 'actions'}
											<DataTableColumnHeader {props} {tableModel} cellId={cell.id}>
												<Render of={cell.render()} />
											</DataTableColumnHeader>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#if $pageRows.length}
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											<Render of={cell.render()} />
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">
							{$LL.transactionsPage.table.noResults()}
						</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	<ScrollDownHint />
{/if}
