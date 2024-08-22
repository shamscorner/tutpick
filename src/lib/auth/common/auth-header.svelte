<script lang="ts">
	import { Heading } from '$lib/components/ui/heading';
	import { LL } from '$lib/i18n/i18n-svelte';

	export let label: string;
</script>

<div class="flex w-full flex-col items-center justify-center gap-y-2">
	<Heading element="h1">🔐 {$LL.appName()}</Heading>
	<p class="text-sm text-muted-foreground">
		{label}
	</p>
</div>
