<script lang="ts">
	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { cn } from '$lib/utils';
</script>

<div class={cn('flex w-full items-center gap-x-2', $$restProps.class)}>
	<Button href="/auth/google" size="lg" variant="outline" class="w-full">
		<Icons.google class="mr-3 h-5 w-5" />
		{$LL.loginPage.form.continueWithGoogle()}
	</Button>
</div>
