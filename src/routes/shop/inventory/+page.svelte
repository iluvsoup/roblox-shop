<script lang="ts">
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";
	import Spinner from "$lib/components/Spinner.svelte";

	import { errorToast } from "$lib/toast";
	import { URL } from "$lib/constants";

	let redeemableCode: string | null;

	const loadInventory = async (): Promise<App.Item[]> => {
		const response = await fetch(`${URL}/api/inventory`);

		if (!response.ok) {
			errorToast("Failed to fetch inventory");
			throw new Error(`${response.status}: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	};
</script>

<svelte:head>
	<title>Inventory</title>
	<meta name="description" content="Where you can find all your purchased products" />
</svelte:head>

<template>
	<h1>Inventory</h1>

	<div class="bar" />

	{#if redeemableCode}
		<h1>{redeemableCode}</h1>
		<p>Enter this code inside roblox to redeem your purchase, make sure NOT to share it with anybody else</p>

		<button
			class="hide"
			on:click={() => {
				redeemableCode = null;
			}}>hide code</button
		>
	{:else}
		{#await loadInventory()}
			<div class="loading">
				<Spinner />
			</div>
		{:then data}
			{#if data.length === 0}
				<h2>Nothing here yet!</h2>
			{:else}
				<div class="products">
					{#each data as product}
						<div class="product">
							<img class="image" alt="product" src={product.data.images[0]} />
							<p class="name">{product.data.name}</p>
							<button
								class="redeem"
								on:click={() => {
									redeemableCode = product.code;
								}}>REDEEM</button
							>
						</div>
					{/each}
				</div>
			{/if}
		{:catch err}
			<div class="error">
				<ErrorMessage message={err.message} />
			</div>
		{/await}
	{/if}
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

	.error {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}

	.product {
		width: 15rem;
		background-color: #eee;
		margin-right: 10px;
		height: 15rem;
		/* cursor: pointer; */
	}

	.image {
		width: 100%;
		height: 50%;
	}

	.name {
		text-align: center;
	}

	.hide {
		display: block;
		margin: 1rem 0 1rem 0;
	}

	.redeem {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 10rem;
		height: 3rem;
	}
</style>
