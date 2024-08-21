<script lang="ts">
	import Seo from '$lib/components/common/seo.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
</script>

<Seo title={$LL.title()} description={$LL.description()} keywords={$LL.keywords()} />
