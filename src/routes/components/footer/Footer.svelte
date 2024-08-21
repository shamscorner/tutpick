<script lang="ts">
	import { Button } from '@shamscorner/svelte-ui/components/button';

	import { Icons } from '$lib/components/icons';
</script>

<footer class="relative flex items-center justify-center gap-3 bg-secondary px-4 py-3">
	<p class="text-center text-sm font-medium">
		<b>Shamim Hossain</b> - Full-stack developer @secureship
	</p>
	<Button
		href="https://github.com/shamscorner"
		target="_blank"
		variant="outline"
		size="icon"
		class="shrink-0"
	>
		<Icons.github class="h-4 w-4" />
	</Button>
	<Button
		href="https://www.linkedin.com/in/shamscorner/"
		target="_blank"
		variant="outline"
		size="icon"
		class="shrink-0"
	>
		<Icons.linkedin class="h-4 w-4" />
	</Button>
</footer>
