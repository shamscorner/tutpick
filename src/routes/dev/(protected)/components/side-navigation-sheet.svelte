<script lang="ts">
	import MenuIcon from 'lucide-svelte/icons/menu';

	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { LL } from '$lib/i18n/i18n-svelte';
	import HomeLink from '$routes/(protected)/components/home-link.svelte';

	import NavigationItems from './navigation-items.svelte';

	let isOpen = false;

	function closeSheet() {
		isOpen = false;
	}
</script>

<Sheet.Root bind:open={isOpen}>
	<Sheet.Trigger asChild let:builder>
		<!-- navigation menu button for small screen -->
		<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
			<MenuIcon class="h-5 w-5" />
			<span class="sr-only">{$LL.common.toggleNavigationMenu()}</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="flex flex-col">
		<NavigationItems onItemClicked={closeSheet}>
			<HomeLink />
		</NavigationItems>
		<!-- <div class="mt-auto">
			<UpgradeToProPlan />
			Add something that stay bottom portion of the navbar
		</div> -->
	</Sheet.Content>
</Sheet.Root>
