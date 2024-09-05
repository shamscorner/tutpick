<script lang="ts">
	import { toast } from 'svelte-sonner';
	import TransactionsIcon from 'lucide-svelte/icons/arrow-right-left';
	import HowToIcon from 'lucide-svelte/icons/circle-help';
	import SavedCardsIcon from 'lucide-svelte/icons/credit-card';
	import LayoutDashboardIcon from 'lucide-svelte/icons/layout-dashboard';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { appHomeRoute, howToRoute, savedCardsRoute, transactionsRoute } from '$lib/auth/routes';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { cn } from '$lib/utils';

	export let isSheetMode = false;
	export let onItemClicked: () => void = () => null;

	let isLoadingSellForm = false;

	function redirectToPaymentForm(data?: Record<string, unknown>) {
		if (!data) {
			toast.error($LL.common.somethingWrong());
			return;
		}
		window.location.href = (data as any).paymentUrl;
	}
</script>

<nav class={cn('grid gap-3', $$restProps.class)}>
	<slot></slot>

	<a
		href="/dashboard"
		class={cn(
			'mx-[-0.65rem] flex items-center px-3  py-2 hover:text-foreground',
			isSheetMode ? 'gap-4 rounded-xl text-lg font-medium' : 'gap-2 rounded-md text-sm',
			$page.url.pathname === appHomeRoute ? 'bg-muted' : 'text-muted-foreground'
		)}
		on:click={onItemClicked}
	>
		<LayoutDashboardIcon class="h-5 w-5" />
		{$LL.dashboardPage.navigations.dashboard()}
	</a>

	<a
		href="/transactions"
		class={cn(
			'mx-[-0.65rem] flex items-center px-3  py-2 hover:text-foreground',
			isSheetMode ? 'gap-4 rounded-xl text-lg font-medium' : 'gap-2 rounded-md text-sm',
			$page.url.pathname === transactionsRoute ? 'bg-muted' : 'text-muted-foreground'
		)}
		on:click={onItemClicked}
	>
		<TransactionsIcon class="h-5 w-5" />
		{$LL.dashboardPage.navigations.transactions()}
	</a>

	<a
		href="/saved-cards"
		class={cn(
			'mx-[-0.65rem] flex items-center px-3  py-2 hover:text-foreground',
			isSheetMode ? 'gap-4 rounded-xl text-lg font-medium' : 'gap-2 rounded-md text-sm',
			$page.url.pathname === savedCardsRoute ? 'bg-muted' : 'text-muted-foreground'
		)}
		on:click={onItemClicked}
	>
		<SavedCardsIcon class="h-5 w-5" />
		{$LL.dashboardPage.navigations.savedCards()}
	</a>

	<a
		href="/how-to"
		class={cn(
			'mx-[-0.65rem] flex items-center px-3  py-2 hover:text-foreground',
			isSheetMode ? 'gap-4 rounded-xl text-lg font-medium' : 'gap-2 rounded-md text-sm',
			$page.url.pathname === howToRoute ? 'bg-muted' : 'text-muted-foreground'
		)}
		on:click={onItemClicked}
	>
		<HowToIcon class="h-5 w-5" />
		{$LL.dashboardPage.navigations.howTo()}
	</a>

	<form
		action="/dashboard/?/createSellUrl"
		method="post"
		use:enhance={() => {
			isLoadingSellForm = true;

			return ({ result }) => {
				if (result.type === 'success') {
					redirectToPaymentForm(result.data);
					return;
				}
				toast.error($LL.common.somethingWrong());
				isLoadingSellForm = false;
			};
		}}
		class="mt-4"
	>
		<Button type="submit" class="w-full text-lg" size="lg" disabled={isLoadingSellForm}>
			<span class="mr-2">+</span>
			<span class="font-semibold">{$LL.common.sell()}</span>
		</Button>
	</form>
</nav>
