<script lang="ts">
	import { cn } from '@shamscorner/svelte-ui';
	import { Button } from '@shamscorner/svelte-ui/components/button';

	import { Icons } from '$lib/components/icons';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<div class={cn('flex w-full items-center gap-x-2', $$restProps.class)}>
	<Button href="/auth/google" size="lg" variant="outline" class="w-full">
		<Icons.google class="mr-3 h-5 w-5" />
		{$LL.loginPage.form.continueWithGoogle()}
	</Button>
</div>
