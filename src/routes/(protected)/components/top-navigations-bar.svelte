<script lang="ts">
	import UserDropdown from '$lib/auth/common/user-dropdown.svelte';

	import NotificationPopover from '../notifications/components/notification-popover.svelte';

	import SideNavigationSheet from './side-navigation-sheet.svelte';
</script>

<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
	<!-- side navigation small screen -->
	<SideNavigationSheet />

	<div class="ml-auto">
		<NotificationPopover />
	</div>

	<UserDropdown />
</header>
