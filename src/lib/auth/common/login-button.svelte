<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { cn } from '$lib/utils';

	import type { PageData } from '../../../routes/(onboarding)/auth/login/$types';
	import LoginForm from '../login/login-form.svelte';

	import AuthHeader from './auth-header.svelte';

	export let mode: 'modal' | 'redirect' = 'redirect';
	export let data: PageData | undefined = undefined;
</script>

{#if mode === 'modal' && data}
	<Dialog.Root>
		<Dialog.Trigger class={cn(buttonVariants({ variant: 'default' }), 'py-[22px]')}>
			<slot />
		</Dialog.Trigger>
		<Dialog.Content class="pb-16 sm:max-w-[425px]">
			<Dialog.Header>
				<AuthHeader label={$LL.loginPage.title()} />
			</Dialog.Header>

			<LoginForm data={data.form} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Button size="lg" href="/auth/login">
		<slot />
	</Button>
{/if}
