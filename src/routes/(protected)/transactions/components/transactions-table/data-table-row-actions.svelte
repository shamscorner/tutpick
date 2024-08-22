<script lang="ts">
	import DotsHorizontal from 'lucide-svelte/icons/ellipsis';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { type DataItem, dataItemSchema } from './types';

	export let row: DataItem;
	const item = dataItemSchema.parse(row);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
		>
			<DotsHorizontal class="h-4 w-4" />
			<span class="sr-only">Open Menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[160px]" align="end">
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item>Make a copy</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Delete
			<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
