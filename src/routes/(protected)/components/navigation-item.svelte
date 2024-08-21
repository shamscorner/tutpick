<script lang="ts">
	import { cn } from '@shamscorner/svelte-ui';

	export let active = false;

	const { class: className, ...restProps } = $$restProps;
</script>

<a
	href="##"
	class={cn(
		'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground',
		active ? 'bg-muted' : 'text-muted-foreground',
		className
	)}
	on:click
	{...restProps}
>
	<slot></slot>
</a>
