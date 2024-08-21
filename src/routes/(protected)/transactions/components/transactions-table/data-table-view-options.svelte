<script lang="ts">
	import type { TableViewModel } from 'svelte-headless-table';
	import { Button } from '@shamscorner/svelte-ui/components/button';
	import * as DropdownMenu from '@shamscorner/svelte-ui/components/dropdown-menu';
	import MixerHorizontal from 'lucide-svelte/icons/chevron-down';

	import { LL } from '$lib/i18n/i18n-svelte';

	import type { DataItem } from './types';

	export let tableModel: TableViewModel<DataItem>;
	const { pluginStates, flatColumns } = tableModel;
	const { hiddenColumnIds } = pluginStates.hide;

	function handleHide(id: string) {
		hiddenColumnIds.update((ids: string[]) => {
			if (ids.includes(id)) {
				return ids.filter((i) => i !== id);
			}
			return [...ids, id];
		});
	}

	const hidableCols = ['status', 'amount', 'created_at'];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="sm" class="ml-auto h-8" builders={[builder]}>
			<MixerHorizontal class="mr-2 h-4 w-4" />
			{$LL.common.view()}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>
			{$LL.common.toggleColumns()}
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#each flatColumns as col}
			{#if hidableCols.includes(col.id)}
				<DropdownMenu.CheckboxItem
					checked={!$hiddenColumnIds.includes(col.id)}
					on:click={() => handleHide(col.id)}
				>
					{col.header}
				</DropdownMenu.CheckboxItem>
			{/if}
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
