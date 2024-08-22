<script lang="ts">
	import type { FormStatus } from '@shamscorner/shared';
	import { performFormValidation } from '@shamscorner/svelte-shared/services';

	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { type FormSchema, formSchema } from '$lib/auth/my-profile/schema';
	import { type User } from '$lib/auth/types';
	import { Icons } from '$lib/components/icons';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { LL } from '$lib/i18n/i18n-svelte';
	// import { browser } from '$app/environment';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let user: User;

	let formStatus: { message: string; type: FormStatus } = {
		message: '',
		type: 'error'
	};
	let isLoadingFormSubmit = false;

	const form = superForm(data, {
		dataType: 'json',
		resetForm: false,
		validators: zodClient(formSchema),
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
					message: $LL.myProfilePage.form.successStatus(),
					type: 'success'
				};
			}

			isLoadingFormSubmit = false;
		}
	});

	const { form: formData, enhance } = form;

	$: {
		formData.update(() => ({
			name: user.name,
			isTwoFactorEnabled: user.isTwoFactorEnabled || false
		}));
	}
</script>

<form method="POST" action="/my-profile?/updateProfile" use:enhance class="space-y-4">
	<div class="space-y-2">
		<Label>{$LL.myProfilePage.form.id()}</Label>
		<Input value={user.id} disabled />
	</div>

	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>{$LL.myProfilePage.form.name()}</Form.Label>
			<Input {...attrs} bind:value={$formData.name} placeholder="John Doe" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- TODO: implement two factor enabled later -->
	<!-- <Form.Field {form} name="isTwoFactorEnabled" class="pt-2">
		<Form.Control let:attrs>
			<Form.Label>
				<div class="flex items-center gap-4 rounded-md border border-input px-3 py-3.5">
					<div>
						<div class="font-bold">
							{$LL.myProfilePage.form.twoFactorAuth.title()}
						</div>
						<div class="mt-1 text-sm text-muted-foreground">
							{$LL.myProfilePage.form.twoFactorAuth.subtitle()}
						</div>
					</div>
					<Switch {...attrs} bind:checked={$formData.isTwoFactorEnabled} class="shrink-0" />
				</div>
			</Form.Label>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field> -->

	<Form.Message show={!!formStatus.message} type={formStatus.type}>
		{formStatus.message || $LL.errors.somethingWentWrong()}
	</Form.Message>

	<div class="pt-4">
		<Form.Button disabled={isLoadingFormSubmit} class="w-full">
			{#if isLoadingFormSubmit}
				<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			{$LL.myProfilePage.form.submit()}
		</Form.Button>
	</div>

	<!-- {#if browser}
		<SuperDebug data={$formData} />
	{/if} -->
</form>
