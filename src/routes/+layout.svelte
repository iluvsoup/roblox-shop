<script lang="ts">
	import { navigating } from "$app/stores";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { clearToasts } from "$lib/toast";

	import Spinner from "$lib/components/Spinner.svelte";

	import type { SvelteToastOptions } from "@zerodevx/svelte-toast";

	const options: SvelteToastOptions = {};

	clearToasts();
</script>

<template>
	{#if $navigating}
		<div class="navigating">
			<Spinner />
		</div>
	{/if}

	<slot />
	<SvelteToast {options} />
</template>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

	:root {
		--primary: rgb(27, 27, 27);
		--primary-dark: rgb(15, 15, 15);
		--secondary: rgb(0, 85, 255);
		--secondary-alternate: rgb(0, 47, 255);
		font-family: Poppins;
	}

	:global(body) {
		margin: 0;
	}

	.navigating {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
