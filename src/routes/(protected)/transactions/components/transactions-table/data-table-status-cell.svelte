<script lang="ts">
	import { cn } from '@shamscorner/svelte-ui';

	import { statuses } from './data';

	export let value: string;
	const status = statuses.find((status) => status.value === value);
	const Icon = status?.icon;
</script>

{#if status}
	<div class="w-[100px]">
		<div
			class={cn(
				'inline-flex items-center rounded-full py-1 pl-1 pr-2 text-xs font-medium ring-1 ring-inset',
				status.style
			)}
		>
			{#if Icon}
				<Icon class="mr-2 h-4 w-4" />
			{/if}
			<span>{status.label}</span>
		</div>
	</div>
{/if}
