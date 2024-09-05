<script lang="ts">
	import { navigating } from '$app/stores';
	import Seo from '$lib/components/common/seo.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';

	import Loader from './common/components/loader.svelte';
	import SideNavigations from './common/components/side-navigations.svelte';
	import TopNavigationsBar from './common/components/top-navigations-bar.svelte';
</script>

<Seo
	title={$LL.dashboardPage.title()}
	description={$LL.dashboardPage.description()}
	keywords={$LL.dashboardPage.keywords()}
/>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<SideNavigations />

	<div class="flex flex-col">
		<TopNavigationsBar />

		<main class="relative flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot />

			{#if $navigating}
				<Loader />
			{/if}
		</main>
	</div>
</div>
