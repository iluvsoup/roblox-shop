<script lang="ts">
	import { errorToast } from "$lib/toast";
	import { URL } from "$lib/constants";

	let redeemableCode: string | null;

	const loadInventory = async (): Promise<App.Item[]> => {
		const response = await fetch(`${URL}/api/inventory`);

		if (!response.ok) {
			errorToast("Failed to fetch inventory");
			throw new Error();
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

	{#if redeemableCode}
		<h1>{redeemableCode}</h1>
		<p>
			Enter this code inside roblox to redeem your purchase, make sure NOT to share it with anybody
			else
		</p>

		<button
			class="hide"
			on:click={() => {
				redeemableCode = null;
			}}>hide code</button
		>
	{:else}
		<div class="products">
			{#await loadInventory()}
				<p>Loading</p>
			{:then data}
				{#if data.length === 0}
					<h2>Nothing here yet!</h2>
				{:else}
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
				{/if}
			{:catch}
				<h2>An error occured</h2>
			{/await}
		</div>
	{/if}
</template>

<style>
	.products {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 1rem;
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
