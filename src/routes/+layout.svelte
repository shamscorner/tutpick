<script lang="ts">
	import { onMount } from 'svelte';
	import {
		type FpType,
		getFromLocalStorageWithExpiry,
		saveToLocalStorageWithExpiry
	} from '@shamscorner/shared';
	import Analytics from '@shamscorner/svelte-shared/components/Analytics';
	import { ModeWatcher } from 'mode-watcher';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_GOOGLE_TAG_MEASUREMENT_ID } from '$env/static/public';
	import { Toaster } from '$lib/components/ui/sonner';
	import { setLocale } from '$lib/i18n/i18n-svelte';

	import type { LayoutData } from './$types';

	import '../app.postcss';

	export let data: LayoutData;

	setLocale(data.locale);

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		saveReferralCode();
		saveFirstPageVisit();

		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	function saveReferralCode() {
		const referralCodeFromUrl = $page.url.searchParams.get('rc');
		if (!referralCodeFromUrl) return;

		const getFirst20Characters = (inputString: string) =>
			inputString.length <= 20 ? inputString : inputString.substring(0, 20);

		saveToLocalStorageWithExpiry('rc', getFirst20Characters(referralCodeFromUrl), 30);
	}

	function saveFirstPageVisit() {
		const existingFirstPage = localStorage.getItem('fp');
		if (existingFirstPage) return;

		const fpObj: FpType = {
			landing: document.location.pathname,
			referrer: document.referrer,
			referrerUrl: document.URL,
			ua: navigator.userAgent,
			rc: getFromLocalStorageWithExpiry('rc') || ''
		};

		localStorage.setItem('fp', JSON.stringify(fpObj));
	}
</script>

<ModeWatcher />

<Toaster richColors />

<Analytics gtagMeasurementId={PUBLIC_GOOGLE_TAG_MEASUREMENT_ID} />

<slot />
