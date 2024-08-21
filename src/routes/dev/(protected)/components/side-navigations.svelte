<script lang="ts">
	import HomeLink from '$routes/(protected)/components/home-link.svelte';

	import NavigationItems from './navigation-items.svelte';
</script>

<div class="hidden border-r bg-muted/40 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
			<HomeLink />
		</div>
		<div class="flex-1">
			<NavigationItems class="mx-5" />
		</div>
		<div class="mt-auto p-4">
			<!-- <UpgradeToProPlan />
			Add something that stay bottom portion of the navbar -->
		</div>
	</div>
</div>
