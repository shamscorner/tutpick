<script lang="ts">
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';

	import { LL } from '$lib/i18n/i18n-svelte';

	import CardWrapper from '../common/card-wrapper.svelte';

	import LoginForm from './login-form.svelte';
	import { type FormSchema } from './schema';

	interface LoginCardProps {
		data: SuperValidated<Infer<FormSchema>>;
	}

	let { data }: LoginCardProps = $props();
</script>

<CardWrapper headerLabel={$LL.loginPage.title()} showSocial>
	<LoginForm {data} />
</CardWrapper>
