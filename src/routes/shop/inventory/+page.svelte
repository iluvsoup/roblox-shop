<script lang="ts">
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Item from "./Item.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import Fa from "svelte-fa";

	import { fade } from "svelte/transition";

	import { getUrl } from "$lib/constants";
	import { errorToast } from "$lib/toast";
	import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";

	let redeemableCode: string | null;

	const loadInventory = async (): Promise<App.Item[]> => {
		const response = await fetch(`${getUrl()}/api/inventory`);

		if (!response.ok) {
			errorToast("Failed to fetch inventory");
			throw new Error(`${response.status}: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	};

	const hide = () => {
		redeemableCode = null;
	};

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(redeemableCode!);
		} catch (err) {
			console.error("Failed copying text, is HTTPS enabled?", err);
		}
	};
</script>

<svelte:head>
	<title>Inventory</title>
	<meta name="description" content="Where you can find all your purchased products" />
</svelte:head>

<template>
	<h1>Inventory</h1>

	<div class="bar" />

	{#await loadInventory()}
		<div class="loading">
			<Spinner />
		</div>
	{:then data}
		{#if redeemableCode}
			<div class="overlay" transition:fade={{ duration: 250 }}>
				<div class="header">
					<h1>{redeemableCode}</h1>
					<div class="copy" on:click={copy} on:keydown={copy}>
						<Fa icon={faCopy} size="2.5x" />
					</div>
				</div>

				<p>Use this code in-game to redeem your purchased item</p>

				<div class="close" on:click={hide} on:keydown={hide}>
					<Fa icon={faXmark} size="3x" />
				</div>
			</div>
		{/if}

		{#if data.length === 0}
			<h2>Nothing here yet!</h2>
		{:else}
			<div class="products">
				{#each data as product}
					<div class="wrapper">
						<Item
							data={product}
							on:redeem={(event) => {
								redeemableCode = event.detail.code;
							}}
						/>
					</div>
				{/each}
			</div>
		{/if}
	{:catch err}
		<div class="error">
			<ErrorMessage message={err.message} />
		</div>
	{/await}
</template>

<style>
	h1 {
		color: #fff;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 48px;
		text-align: center;
	}

	h2 {
		color: #888;
		text-align: center;
		font-weight: 400;
	}

	.overlay {
		background: rgba(0, 0, 0, 0.9);
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.overlay .header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 1rem;
		padding-right: 1rem;
		gap: 1.5rem;
	}

	.overlay .close {
		position: absolute;
		top: 0;
		right: 0;
		color: #fff;
		cursor: pointer;
		margin: 1.5rem;
		transition: transform 1s ease;
	}

	.overlay .copy {
		color: #fff;
		cursor: pointer;
		transition: transform 0.25s ease;
	}

	.overlay .copy:hover {
		transform: scale(105%);
	}

	.overlay .close:hover {
		transform: rotate(360deg);
	}

	.overlay h1 {
		padding-top: 0;
		padding-bottom: 0;
		margin: 0;
	}

	.overlay > p {
		padding-left: 2rem;
		padding-right: 2rem;
		color: #fff;
		text-align: center;
		font-size: 24px;
	}

	.bar {
		display: block;
		margin-left: auto;
		margin-right: auto;
		height: 4px;
		width: 8rem;
		background-color: #333;
		border-radius: 4px;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 3rem;
	}

	.products {
		display: grid;
		gap: 1.5rem;
		grid-auto-columns: max-content;
		justify-items: center;
		margin-left: auto;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		margin-right: auto;
		margin-bottom: 2rem;
	}

	@media screen and (min-width: 550px) {
		.products {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			max-width: 550px;
		}
	}

	@media screen and (min-width: 800px) {
		.products {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			max-width: 1100px;
		}
	}

	@media screen and (min-width: 1100px) {
		.products {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			max-width: 1230px;
		}
	}

	.wrapper {
		width: 100%;
		max-width: 18rem;
		margin-top: 3rem;
	}

	.error {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}
</style>
