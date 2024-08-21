<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { TableViewModel } from 'svelte-headless-table';
	import { Button } from '@shamscorner/svelte-ui/components/button';
	import { DatePicker } from '@shamscorner/svelte-ui/components/date-picker';
	import { Input } from '@shamscorner/svelte-ui/components/input';
	import type { DateRange } from 'bits-ui';
	import CircleClose from 'lucide-svelte/icons/circle-x';

	import { browser } from '$app/environment';
	import { LL } from '$lib/i18n/i18n-svelte';

	import { statuses } from './data';
	import { DataTableFacetedFilter, DataTableViewOptions } from './index.js';
	import type { DataItem } from './types';

	export let tableModel: TableViewModel<DataItem>;
	export let onApplyDate: (value?: DateRange) => void = () => {};
	export let dateRange: DateRange | undefined = undefined;

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset =
		dateRange || Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);

	function resetFilters() {
		$filterValue = '';
		$filterValues.status = [];
		dateRange = undefined;
	}
</script>

<div class="flex items-center justify-between gap-2">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>

		<DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Status"
			options={statuses}
		/>

		{#if browser}
			<DatePicker value={dateRange} onApply={onApplyDate}>
				{$LL.common.pickDate()}
			</DatePicker>
		{/if}

		{#if showReset}
			<Button on:click={resetFilters} variant="ghost" class="h-8 px-2 lg:px-3">
				{$LL.common.reset()}
				<CircleClose class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
