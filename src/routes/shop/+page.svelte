<script lang="ts">
	import Product from "./Product.svelte";
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

	<div class="products">
		{#await loadProducts()}
			<p>Loading products</p>
		{:then products}
			{#if products.length === 0}
				<h2>Nothing here yet!</h2>
			{:else}
				{#each products as product}
					<Product data={product} uid={data.uid} />
				{/each}
			{/if}
		{:catch err}
			<ErrorMessage message={err.message} />
		{/await}
	</div>
</template>

<style>
	h1 {
		margin-top: 0;
		margin-bottom: 0;
		color: #fff;
	}

	.products {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.5rem;
		gap: 0.5rem;
	}
</style>
