<script lang="ts">
	import Product from "./Product.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import ErrorMessage from "$lib/components/ErrorMessage.svelte";

	import { errorToast } from "$lib/toast";
	import { URL } from "$lib/constants";

	import type { PageData } from "./$types";

	export let data: PageData;

	const loadProducts = async (): Promise<App.Product[]> => {
		const response = await fetch(`${URL}/api/products`);

		if (!response.ok) {
			errorToast("Failed to fetch products");
			throw new Error(`${response.status.toString()}: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	};
</script>

<svelte:head>
	<title>Shop</title>
	<meta name="description" content="Web shop" />
</svelte:head>

<template>
	<h1>Products</h1>

	<div class="bar" />

	{#await loadProducts()}
		<div class="loading">
			<Spinner />
		</div>
	{:then products}
		{#if products.length === 0}
			<h2>Nothing here yet!</h2>
		{:else}
			<div class="products">
				{#each products as product}
					<div class="wrapper">
						<Product data={product} uid={data.uid} />
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
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 48px;
		color: #fff;
		text-align: center;
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

	.error {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}

	.wrapper {
		width: 100%;
		max-width: 18rem;
		margin-top: 3rem;
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
</style>
