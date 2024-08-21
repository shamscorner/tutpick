<script lang="ts">
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader
	} from '@shamscorner/svelte-ui/components/card';

	import AuthHeader from './auth-header.svelte';
	import SocialOptions from './social-options.svelte';

	export let headerLabel: string;
	export let showSocial = false;
</script>

<Card class="w-[400px] shadow-md">
	<CardHeader>
		<AuthHeader label={headerLabel}></AuthHeader>
	</CardHeader>
	<CardContent>
		<slot />
	</CardContent>
	{#if showSocial}
		<CardFooter>
			<SocialOptions />
		</CardFooter>
	{/if}
</Card>
