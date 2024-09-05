<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';

	import { Icons } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Switch } from '$lib/components/ui/switch';
	import { LL } from '$lib/i18n/i18n-svelte';

	const notifications = [
		{
			id: 1,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: false,
			createdAt: '2024-07-13T12:00:00Z'
		},
		{
			id: 2,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: true,
			createdAt: '2021-09-01T12:00:00Z'
		},
		{
			id: 3,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: false,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 4,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: true,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 5,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: false,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 6,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: true,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 7,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: false,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 8,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: true,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 9,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: false,
			createdAt: '2021-08-12T12:00:00Z'
		},
		{
			id: 10,
			title: 'A cool notification',
			body: 'A cool description of the notification above. Thank you for using it.',
			isRead: true,
			createdAt: '2021-08-12T12:00:00Z'
		}
	];

	$: unreadNotifications = notifications.filter((notification) => !notification.isRead);

	$: notificationBadgeLabel = unreadNotifications
		? unreadNotifications.length > 9
			? '9+'
			: unreadNotifications.length
		: 0;
</script>

<Popover.Root portal={null}>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			size="icon"
			class="relative h-10 w-10 rounded-full"
		>
			<Icons.bell class="h-5 w-5" />
			<span class="sr-only">{$LL.common.toggleNotification()}</span>
			<span
				class="absolute -top-[2px] right-[2px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white"
			>
				{notificationBadgeLabel}
			</span>
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-96" align="end">
		<div class="grid gap-3">
			<div class="flex items-center justify-between">
				<h4 class="text-xl font-bold leading-none">
					{$LL.notifications.title()}
				</h4>
				<!-- only unread switch -->
				<div class="flex items-center space-x-2">
					<Switch id="only-unread-notifications" />
					<Label for="only-unread-notifications">{$LL.notifications.actions.onlyUnread()}</Label>
				</div>
			</div>
			<p class="text-sm text-muted-foreground">
				{$LL.notifications.subtitle()}
			</p>
			<div class="text-right">
				<!-- mark all as read button -->
				<Button variant="link" size="sm" class="px-0 underline">
					{$LL.notifications.actions.markAllAsRead()}
				</Button>
			</div>
			<div class="-mx-4 mt-2">
				<ScrollArea class="h-96 w-full">
					<ul class="grid gap-7">
						{#each notifications as notification (notification.id)}
							<li class="flex items-center justify-between gap-3 px-4">
								<div class="flex-1">
									<div class="text-sm font-semibold">
										{notification.title}
										<span class="text-xs text-muted-foreground">
											- {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
										</span>
									</div>
									<div class="text-xs">
										{notification.body}
									</div>
								</div>
								{#if !notification.isRead}
									<Button variant="ghost" size="icon" class="h-7 w-7 shrink-0 rounded-full">
										<div class="h-3 w-3 rounded-full bg-blue-500"></div>
									</Button>
								{/if}
							</li>
						{/each}
					</ul>
				</ScrollArea>
			</div>
			<div class="text-center">
				<!-- mark all as read button -->
				<Button variant="link" size="sm" class="px-0 underline">
					{$LL.notifications.actions.showAllNotifications()}
				</Button>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
