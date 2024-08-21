<script lang="ts">
	import Seo from '$lib/components/common/seo.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import TopNavigationsBar from '$routes/(protected)/components/top-navigations-bar.svelte';

	import SideNavigations from './components/side-navigations.svelte';
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

		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot />
		</main>
	</div>
</div>
