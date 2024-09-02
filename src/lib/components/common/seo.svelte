<script lang="ts">
	import Seo from '@shamscorner/svelte-shared/components/Seo';

	import { PUBLIC_APP_PAGE } from '$env/static/public';
	import { LL } from '$lib/i18n/i18n-svelte';

	interface SeoProps {
		title: string;
		description: string;
		keywords: string;
	}

	let { title, description, keywords }: SeoProps = $props();
</script>

<Seo
	title={`${title} | ${$LL.title()}`}
	{description}
	{keywords}
	publicLandingPage={PUBLIC_APP_PAGE}
	schemaMarkup={$LL.schemaMarkup}
	appName={$LL.appName()}
/>
