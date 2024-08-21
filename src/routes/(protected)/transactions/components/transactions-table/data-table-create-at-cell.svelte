<script lang="ts">
	import { format, parseISO } from 'date-fns';

	export let value: string;
</script>

<div class="flex space-x-2">
	<span>{format(parseISO(value), 'yyyy-MM-dd - hh:mm:ss a')}</span>
</div>
