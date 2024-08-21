<script lang="ts">
	import AppIcon from 'lucide-svelte/icons/dollar-sign';

	import { appHomeRoute } from '$lib/auth/routes';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<a href={appHomeRoute} class="flex items-center gap-2 font-semibold text-pink-600">
	<AppIcon class="h-6 w-6" />
	<span class="">{$LL.appName()}</span>
</a>
