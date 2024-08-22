<script lang="ts">
	import { onMount } from 'svelte';
	import { type AnalyticsDto, type FormStatus, getSiteAnalytics } from '@shamscorner/shared';
	import { performFormValidation } from '@shamscorner/svelte-shared/services';

	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { PUBLIC_APP_PAGE } from '$env/static/public';
	import { Icons } from '$lib/components/icons';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { LL } from '$lib/i18n/i18n-svelte';

	import { type FormSchema, formSchema } from './schema';
	import { deleteLastLoginEmail, getLastLoginEmail, saveLastLoginEmail } from './utils';

	export let data: SuperValidated<Infer<FormSchema>>;

	let isLoadingFormSubmit = false;
	let formResponse: { message: string; type: FormStatus } = {
		message: '',
		type: 'error'
	};
	let rememberEmail = false;

	let analytics: AnalyticsDto = {
		browserHash: '',
		landingPage: PUBLIC_APP_PAGE,
		isIncognitoMode: false,
		referralSiteUrl: undefined
	};

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onSubmit: () => {
			formResponse = {
				message: '',
				type: 'error'
			};
			isLoadingFormSubmit = true;
		},
		onResult: async ({ result }) => {
			const message = performFormValidation(result);
			if (message) {
				formResponse = {
					message,
					type: 'error'
				};
				isLoadingFormSubmit = false;
				return;
			}

			if (result.type === 'success') {
				formResponse = {
					message: $LL.loginPage.form.success(),
					type: 'success'
				};
				performRememberMe();
			}

			isLoadingFormSubmit = false;
		}
	});

	const { form: formData, enhance } = form;

	$: {
		formData.update((d) => ({
			...d,
			browserHash: analytics.browserHash,
			landingPage: analytics.landingPage || PUBLIC_APP_PAGE,
			referralSiteUrl: analytics.referralSiteUrl || '',
			isIncognitoMode: analytics.isIncognitoMode
		}));
	}

	onMount(async () => {
		const lastLoginEmail = getLastLoginEmail();

		if (lastLoginEmail) {
			$formData.email = lastLoginEmail;
			rememberEmail = true;
		}

		if (navigator) {
			analytics = await getSiteAnalytics();
		}
	});

	function performRememberMe() {
		if (rememberEmail) {
			saveLastLoginEmail($formData.email);
			return;
		}
		deleteLastLoginEmail();
	}
</script>

<div class="grid gap-6">
	<form method="POST" action="/auth/login?/login" use:enhance class="space-y-4">
		<input type="hidden" name="browserHash" bind:value={$formData.browserHash} />
		<input type="hidden" name="isIncognitoMode" bind:value={$formData.isIncognitoMode} />

		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>{$LL.loginPage.form.email()}</Form.Label>
				<Input {...attrs} bind:value={$formData.email} placeholder="john@example.com" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex items-center space-x-4">
			<Switch id="remember-me" bind:checked={rememberEmail} />
			<Label for="remember-me">{$LL.loginPage.form.rememberMe()}</Label>
		</div>

		<div class="pt-5">
			<Form.Message
				show={!!formResponse.message}
				type={formResponse.type}
				persistent={true}
				class="mb-4"
			>
				{formResponse.message || $LL.errors.somethingWentWrong()}
			</Form.Message>

			<Form.Button disabled={isLoadingFormSubmit} class="w-full">
				{#if isLoadingFormSubmit}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$LL.loginPage.form.submit()}
			</Form.Button>
		</div>
	</form>
</div>
