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

	{#await loadInventory()}
		<div class="loading">
			<Spinner />
		</div>
	{:then data}
		{#if data.length === 0}
			<h2>Nothing here yet!</h2>
		{:else if redeemableCode}
			<h1>{redeemableCode}</h1>
			<p>Enter this code inside roblox to redeem your purchase, make sure NOT to share it with anybody else</p>

			<button
				class="hide"
				on:click={() => {
					redeemableCode = null;
				}}>hide code</button
			>
		{:else}
			<div class="products">
				{#each data as product}
					<div class="product">
						<img class="image" alt="product" src={product.data.images[0]} />
						<div class="content">
							<p class="name">{product.data.name}</p>
							<button
								class="redeem"
								on:click={() => {
									redeemableCode = product.code;
								}}>REDEEM</button
							>
						</div>
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
		margin-top: 3rem;
		width: 100%;
		max-width: 18rem;
		background-color: var(--primary-light);
		color: #fff;
		border-radius: 0.5rem;
		overflow: hidden;
		transition: transform, box-shadow;
		transition-duration: 0.5s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.product:hover,
	.product:hover {
		transform: scale(105%);
		z-index: 2;
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
	}

	.product .content {
		padding-top: 1rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-bottom: 1.5rem;
	}

	.product p {
		margin-top: 0;
	}

	.product .image {
		width: 100%;
	}

	.product .name {
		font-size: 24px;
		text-align: center;
	}

	.hide {
		display: block;
		margin: 1rem 0 1rem 0;
	}

	.product .redeem {
		margin-left: auto;
		margin-right: auto;
		display: block;
		background-color: var(--secondary);
		border: 1px solid var(--secondary);
		border-radius: 0.5rem;
		color: #fff;
		font-weight: 700;
		font-size: 18px;
		cursor: pointer;
		transition: box-shadow, 0.5s ease;
		font-family: Poppins;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.product .redeem:hover,
	.product .redeem:focus {
		outline: none;
		/* transform: translateY(-0.125rem); */
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
		background-color: #fff;
		border: 1px solid var(--secondary);
		color: var(--secondary);
	}
</style>
