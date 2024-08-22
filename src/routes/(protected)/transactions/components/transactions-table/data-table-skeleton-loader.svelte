<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
	<table class="min-w-full divide-y divide-gray-300">
		{#each Array.from({ length: 6 }) as _, i (i)}
			<tr>
				<td class="p-4">
					<Skeleton class="h-8" />
				</td>
				<td class="p-4">
					<Skeleton class="h-8" />
				</td>
				<td class="p-4">
					<Skeleton class="h-8" />
				</td>
				<td class="p-4">
					<Skeleton class="h-8" />
				</td>
			</tr>
		{/each}
	</table>
</div>
