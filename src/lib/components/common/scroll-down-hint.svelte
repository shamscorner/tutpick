<script lang="ts">
	import ScrollDownIcon from 'lucide-svelte/icons/move-down';

	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<div class="flex items-center justify-center text-xs text-muted-foreground">
	{$LL.common.scrollDownToLoadMore()}
	<ScrollDownIcon class="ml-1.5 h-3 w-3" />
</div>
