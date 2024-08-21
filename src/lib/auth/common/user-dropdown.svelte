<script lang="ts">
	import { Button } from '@shamscorner/svelte-ui/components/button';
	import * as DropdownMenu from '@shamscorner/svelte-ui/components/dropdown-menu';
	import CircleUserIcon from 'lucide-svelte/icons/circle-user';

	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
			<CircleUserIcon class="h-5 w-5" />
			<span class="sr-only">
				{$LL.common.toggleUserMenu()}
			</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>
			{$LL.dashboardPage.userDropdown.myAccount()}
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<a href="/my-profile">
			<DropdownMenu.Item>
				{$LL.dashboardPage.userDropdown.profile()}
			</DropdownMenu.Item>
		</a>
		<a href="/settings">
			<DropdownMenu.Item>
				{$LL.dashboardPage.userDropdown.settings()}
			</DropdownMenu.Item>
		</a>
		<slot></slot>
		<DropdownMenu.Separator />
		<a href="/auth/logout">
			<DropdownMenu.Item>
				{$LL.dashboardPage.userDropdown.logout()}
			</DropdownMenu.Item>
		</a>
	</DropdownMenu.Content>
</DropdownMenu.Root>
