<script lang="ts">
	import type { FormStatus } from '@shamscorner/shared';
	import { performFormValidation } from '@shamscorner/svelte-shared/services';
	import * as Form from '@shamscorner/svelte-ui/components/form';
	import { Input } from '@shamscorner/svelte-ui/components/input';

	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { type FormSchemaChangeEmail, formSchemaChangeEmail } from '$lib/auth/my-profile/schema';
	import { type User } from '$lib/auth/types';
	import { Icons } from '$lib/components/icons';
	import { LL } from '$lib/i18n/i18n-svelte';
	// import { browser } from '$app/environment';

	export let data: SuperValidated<Infer<FormSchemaChangeEmail>>;
	export let user: User;

	let formStatus: { message: string; type: FormStatus } = {
		message: '',
		type: 'error'
	};
	let isLoadingFormSubmit = false;

	const form = superForm(data, {
		dataType: 'json',
		resetForm: false,
		validators: zodClient(formSchemaChangeEmail),
		onSubmit: () => {
			formStatus = {
				message: '',
				type: 'error'
			};
			isLoadingFormSubmit = true;
		},
		onResult: async ({ result }) => {
			const errorMessage = performFormValidation(result);
			if (errorMessage) {
				formStatus = {
					message: errorMessage,
					type: 'error'
				};
				isLoadingFormSubmit = false;
				return;
			}

			if (result.type === 'success' && result.data) {
				formStatus = {
					message: $LL.myProfilePage.changeEmail.successStatus(),
					type: 'success'
				};
			}

			isLoadingFormSubmit = false;
		}
	});

	const { form: formData, enhance } = form;

	$: {
		formData.update(() => ({
			email: user.email || ''
		}));
	}
</script>

<form method="POST" action="/my-profile?/updateEmail" use:enhance class="space-y-4">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>{$LL.myProfilePage.form.email()}</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="john@example.com" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Message show={!!formStatus.message} type={formStatus.type}>
		{formStatus.message || $LL.errors.somethingWentWrong()}
	</Form.Message>

	<div class="pt-4">
		<Form.Button disabled={isLoadingFormSubmit} class="w-full">
			{#if isLoadingFormSubmit}
				<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			{$LL.myProfilePage.changeEmail.submit()}
		</Form.Button>
	</div>

	<!-- {#if browser}
		<SuperDebug data={$formData} />
	{/if} -->
</form>
