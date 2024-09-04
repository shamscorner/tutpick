<script lang="ts">
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import { LL } from '$lib/i18n/i18n-svelte';

	import AuthHeader from './auth-header.svelte';
	import SocialOptions from './social-options.svelte';

	interface CardWrapperProps {
		headerLabel?: string;
		showSocial?: boolean;
		children?: any;
	}

	let { headerLabel, showSocial, children }: CardWrapperProps = $props();
</script>

<Card class="w-[400px] shadow-md">
	<CardHeader>
		{#if headerLabel}
			<AuthHeader label={headerLabel}></AuthHeader>
		{/if}
	</CardHeader>
	<CardContent>
		{#if showSocial}
			<SocialOptions />
			<div class="mt-4 text-center text-sm font-semibold">{$LL.common.or()}</div>
		{/if}
		{@render children()}
	</CardContent>
</Card>
