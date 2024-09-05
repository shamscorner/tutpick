<script lang="ts">
	import { mode as darkMode, toggleMode as toggleDarkMode } from 'mode-watcher';

	import Seo from '$lib/components/common/seo.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import { LL } from '$lib/i18n/i18n-svelte';

	$: isDarkMode = $darkMode === 'dark';
</script>

<Seo
	title={$LL.settingsPage.title()}
	description={$LL.settingsPage.description()}
	keywords={$LL.settingsPage.keywords()}
/>

<div class="mb-10 flex max-w-4xl flex-col gap-12 lg:flex-row">
	<div class="grid max-w-md flex-1 content-start gap-6">
		<h1 class="font-bold">{$LL.settingsPage.title()}</h1>

		<label
			for="darkModeToggle"
			class="flex items-center gap-4 rounded-md border border-input px-3 py-3.5"
		>
			<div>
				<div class="font-bold">
					{$LL.settingsPage.form.darkMode.title()}
				</div>
				<div class="mt-1 text-sm text-muted-foreground">
					{$LL.settingsPage.form.darkMode.subtitle()}
				</div>
			</div>
			<Switch
				id="darkModeToggle"
				bind:checked={isDarkMode}
				onCheckedChange={toggleDarkMode}
				class="shrink-0"
			/>
		</label>
	</div>
</div>
