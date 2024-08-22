<script lang="ts">
	import { useQuery } from 'convex-svelte';

	import Seo from '$lib/components/common/seo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LL } from '$lib/i18n/i18n-svelte';

	import { api } from '../../convex/_generated/api';

	const query = useQuery(api.tasks.get, {});
</script>

<Seo title={$LL.title()} description={$LL.description()} keywords={$LL.keywords()} />

<main class="flex h-full flex-col items-center justify-center gap-4">
	<h1 class="text-2xl font-semibold">Welcome to Tutpick</h1>
	<Button href="/auth/login">Login</Button>

	<div class="mt-4">
		<h2 class="text-lg font-medium">Convex backend demo</h2>
		{#if query.isLoading}
			Loading...
		{:else if query.error}
			failed to load: {query.error.toString()}
		{:else}
			<ul>
				{#each query.data as task}
					<li>
						{task.isCompleted ? '☑' : '☐'}
						<span>{task.text}</span>
						<span>assigned by {task.assigner}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>
