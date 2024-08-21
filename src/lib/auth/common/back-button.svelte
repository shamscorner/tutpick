<script lang="ts">
	import { cn } from '@shamscorner/svelte-ui';
	import { Button } from '@shamscorner/svelte-ui/components/button';

	export let label: string;
	export let href: string;
</script>

<Button {href} variant="link" size="sm" class={cn('w-full font-normal', $$restProps.class)}>
	{label}
</Button>
