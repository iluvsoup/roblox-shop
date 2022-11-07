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
		}
	]
</script>

<a tabindex="0" href="#main" class="skip">Skip to main content</a>

<header>
	<img class="avatar" src={data.avatarurl} alt="Roblox avatar" />
	<Nav routes={routes} />
</header>

<main id="main">
	<slot />
</main>

<style>
	:global(body) {
		background-color: var(--primary);
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

	main {
		padding: 8px;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #000;
	}
</style>
