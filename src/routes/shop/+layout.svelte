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
	];
</script>

<a tabindex="0" href="#main" class="skip">Skip to main content</a>

<header>
	<img class="avatar" src={data.avatarurl} alt="Roblox avatar" />

	<Nav {routes} />
</header>

<main id="main">
	<slot />
</main>

<style>
	:root {
		--toastContainerTop: 6rem;
		--toastContainerRight: 1rem;
	}

	:global(body) {
		background-color: var(--primary-dark);
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
		width: 48px;
		height: 48px;
		background: #333;
	}

	main {
		padding: 1rem;
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
