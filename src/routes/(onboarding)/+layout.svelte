<script lang="ts">
	import Footer from '$routes/common/components/footer/app-footer.svelte';
	import Navbar from '$routes/common/components/navbar/app-navbar.svelte';
</script>

<div class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	<Navbar />

	<slot />

	<Footer />
</div>
