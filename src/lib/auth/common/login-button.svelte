<script lang="ts">
	import { cn } from '@shamscorner/svelte-ui';
	import { Button, buttonVariants } from '@shamscorner/svelte-ui/components/button';
	import * as Dialog from '@shamscorner/svelte-ui/components/dialog';

	import { LL } from '$lib/i18n/i18n-svelte';

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
