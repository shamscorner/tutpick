<script lang="ts">
	import { Button } from '@shamscorner/svelte-ui/components/button';
	import * as Card from '@shamscorner/svelte-ui/components/card';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Upgrade to Pro</Card.Title>
		<Card.Description>
			Unlock all features and get unlimited access to our support team.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Button size="sm" class="w-full">Upgrade</Button>
	</Card.Content>
</Card.Root>
