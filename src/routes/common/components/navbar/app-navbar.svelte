<script lang="ts">
	import { PUBLIC_LANDING_PAGE } from '$env/static/public';
	import ThemeToggle from '$lib/components/common/ThemeToggle.svelte';
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
</script>

<header class="sticky top-0 z-50 bg-secondary shadow-xl">
	<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
		<Button href={PUBLIC_LANDING_PAGE} variant="outline" size="icon">
			<Icons.home class="h-4 w-4" />
		</Button>

		<ThemeToggle />
	</div>
</header>
