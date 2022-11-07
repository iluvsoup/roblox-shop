<script lang="ts">
	import Nav from "./Nav.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const routes: App.Route[] = [
		{
			name: "Shop",
			link: "/shop"
		},
		{
			name: "Inventory",
			link: "/shop/inventory"
		},
		{
			name: "FAQ",
			link: "/shop/faq"
		}
	]

	let loadingImage: boolean;
</script>

<a tabindex="0" href="#main" class="skip">Skip to main content</a>

<header>
	{#if loadingImage}
		<div class="loading" />
	{/if}

	<img
		class="avatar"
		on:loadstart={() => { loadingImage = true }}
		on:load={() => { loadingImage = false }}
		src={data.avatarurl}
		alt="Roblox avatar"
	/>
	<Nav routes={routes} />
</header>

<main id="main">
	<slot />
</main>

<style>
	:global(body) {
		background-color: var(--primary-moody);
	}

	.skip {
		position: fixed;
		transform: translateY(-100%);
		z-index: 100;
		color: #000;
		background-color: #fff;
		padding: 1rem;
	}

	.skip:focus {
		transform: none;
	}

	.avatar {
		border-radius: 50%;
	}

	.loading {
		border-radius: 50%;
		width: 48px;
		height: 48px;
		background-color: #fff;
	}

	main {
		padding: 8px;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #000;
		border-bottom: solid 1px #333;
	}
</style>
