<script lang="ts">
	import CircleCheckIcon from 'lucide-svelte/icons/circle-check';

	import CardWrapper from '$lib/auth/common/card-wrapper.svelte';
	import Seo from '$lib/components/common/seo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<Seo
	title={$LL.loginPage.title()}
	description={$LL.loginPage.description()}
	keywords={$LL.loginPage.keywords()}
/>

<CardWrapper headerLabel="" showSocial={false}>
	<div class="mt-5">
		<CircleCheckIcon class="mx-auto h-16 w-16 animate-bounce text-green-500" />

		<p class="mt-5 text-center">{$LL.loginPage.form.success()}</p>

		<Button href="/auth/login" class="mt-8 w-full">
			{$LL.common.back()}
		</Button>
	</div>
</CardWrapper>
