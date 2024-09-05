<script lang="ts">
	import { type SuperValidated } from 'sveltekit-superforms';
	import { type Infer } from 'sveltekit-superforms/adapters';

	import ChangeUserEmailForm from '$lib/auth/my-profile/change-user-email-form.svelte';
	import ProfileForm from '$lib/auth/my-profile/profile-form.svelte';
	import { type FormSchema, type FormSchemaChangeEmail } from '$lib/auth/my-profile/schema';
	import Seo from '$lib/components/common/seo.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';

	import type { PageData } from './$types';

	export let data: PageData &
		SuperValidated<Infer<FormSchema>> &
		SuperValidated<Infer<FormSchemaChangeEmail>>;
</script>

<Seo
	title={$LL.myProfilePage.title()}
	description={$LL.myProfilePage.description()}
	keywords={$LL.myProfilePage.keywords()}
/>

<div class="mb-10 flex max-w-4xl flex-col gap-12">
	<div class="grid max-w-md flex-1 content-start gap-6">
		<h1 class="font-bold">{$LL.myProfilePage.title()}</h1>
		<ProfileForm {data} user={data.user} />
	</div>

	<div class="grid max-w-md flex-1 content-start gap-6">
		<h1 class="font-bold">{$LL.myProfilePage.changeEmail.title()}</h1>
		<ChangeUserEmailForm {data} user={data.user} />
	</div>
</div>
