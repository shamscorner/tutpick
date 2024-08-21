<script lang="ts">
	import { Heading } from '@shamscorner/svelte-ui/components/heading';

	import Seo from '$lib/components/common/seo.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import TransactionsTable from '$routes/(protected)/transactions/components/transactions-table/transactions-table.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Seo
	title={$LL.transactionsPage.title()}
	description={$LL.transactionsPage.description()}
	keywords={$LL.transactionsPage.keywords()}
/>

<div class="max-w-7xl">
	<Heading>{$LL.transactionsPage.title()}</Heading>

	<div class="mb-16 mt-6 max-w-4xl">
		<TransactionsTable data={data.data || []} />
	</div>
</div>
