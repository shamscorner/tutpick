<script lang="ts">
	import Seo from '$lib/components/common/seo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<Seo title={$LL.title()} description={$LL.description()} keywords={$LL.keywords()} />

<main class="flex h-full flex-col items-center justify-center gap-4">
	<h1 class="text-2xl font-semibold">Welcome to Tutpick</h1>
	<Button href="/auth/login">Login</Button>
</main>
