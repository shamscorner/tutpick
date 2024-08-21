import ArrowDown from 'lucide-svelte/icons/arrow-down';
import ArrowRight from 'lucide-svelte/icons/arrow-right';
import ArrowUp from 'lucide-svelte/icons/arrow-up';
import Circle from 'lucide-svelte/icons/circle';
import CheckCircled from 'lucide-svelte/icons/circle-check';
import CrossCircled from 'lucide-svelte/icons/circle-x';
import Hold from 'lucide-svelte/icons/shield-alert';
import Stopwatch from 'lucide-svelte/icons/timer';

import type { TransactionStatus } from '$lib/transactions/types';

export const statuses: {
	value: TransactionStatus;
	label: string;
	icon: any;
	style?: string;
}[] = [
	{
		value: 'pending',
		label: 'Pending',
		icon: Stopwatch,
		style: 'bg-gray-50 text-gray-700 ring-gray-600/20'
	},
	{
		value: 'review',
		label: 'Reviewing',
		icon: Circle,
		style: 'bg-blue-50 text-blue-700 ring-blue-600/20'
	},
	{
		value: 'hold',
		label: 'On hold',
		icon: Hold,
		style: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
	},
	{
		value: 'done',
		label: 'Processed',
		icon: CheckCircled,
		style: 'bg-green-50 text-green-700 ring-green-600/20'
	},
	{
		value: 'canceled',
		label: 'Canceled',
		icon: CrossCircled,
		style: 'bg-red-50 text-red-700 ring-red-600/20'
	}
];

export const priorities = [
	{
		label: 'Low',
		value: 'low',
		icon: ArrowDown
	},
	{
		label: 'Medium',
		value: 'medium',
		icon: ArrowRight
	},
	{
		label: 'High',
		value: 'high',
		icon: ArrowUp
	}
];
