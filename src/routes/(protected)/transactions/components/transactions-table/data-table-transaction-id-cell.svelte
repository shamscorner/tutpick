<script lang="ts">
	import * as Tooltip from '@shamscorner/svelte-ui/components/tooltip';

	import { LL } from '$lib/i18n/i18n-svelte';

	export let value: string;

	let isCopied = false;

	$: content = isCopied ? $LL.common.copied() : value.slice(0, 8) + '...';

	function copyToClipboard() {
		navigator.clipboard.writeText(value);
		isCopied = true;

		setTimeout(() => {
			isCopied = false;
		}, 2000);
	}
</script>

<div class="flex space-x-2">
	<span class="font-medium">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<button on:click={copyToClipboard} class={isCopied ? 'text-green-600' : ''}>
					{content}
				</button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{value}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</span>
</div>
