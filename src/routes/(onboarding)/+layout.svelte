<script lang="ts">
	import Footer from '$routes/components/footer/Footer.svelte';
	import Navbar from '$routes/components/navbar/Navbar.svelte';
</script>

<div class="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
	<Navbar />

	<slot />

	<Footer />
</div>
