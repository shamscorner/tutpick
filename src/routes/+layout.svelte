<script lang="ts">
	import {
		type FpType,
		getFromLocalStorageWithExpiry,
		saveToLocalStorageWithExpiry
	} from '@shamscorner/shared';
	import Analytics from '@shamscorner/svelte-shared/components/Analytics';
	import { setupConvex } from 'convex-svelte';
	import { ModeWatcher } from 'mode-watcher';

	import { page } from '$app/stores';
	import { PUBLIC_GOOGLE_TAG_MEASUREMENT_ID } from '$env/static/public';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { Toaster } from '$lib/components/ui/sonner';
	import { setLocale } from '$lib/i18n/i18n-svelte';

	import type { LayoutData } from './$types';

	import '../app.postcss';

	interface LayoutProps {
		data: LayoutData;
		children: any;
	}

	const { data, children }: LayoutProps = $props();

	setLocale(data.locale);
	setupConvex(PUBLIC_CONVEX_URL);

	$effect(() => {
		saveReferralCode();
		saveFirstPageVisit();
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

{@render children()}
