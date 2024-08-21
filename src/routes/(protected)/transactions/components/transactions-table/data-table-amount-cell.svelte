<script lang="ts">
	export let value: number;

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(Number(value));
	}
</script>

<div class="flex space-x-2">
	<span class="font-medium">
		{formatCurrency(value)}
	</span>
</div>
