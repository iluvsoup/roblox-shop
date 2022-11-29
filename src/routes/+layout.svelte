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
