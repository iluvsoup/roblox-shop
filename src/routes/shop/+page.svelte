<script lang="ts">
	import Product from "./Product.svelte";
	import { errorToast } from "$lib/toast";

	import type { PageData } from "./$types";

	export let data: PageData;

	const productsPromise = fetch("/api/products");

	const loadProducts = async (): Promise<App.Product[]> => {
		try {
			const response = await productsPromise;
			try {
				const data = await response.json();
				return data;
			} catch {
				console.log("error");
				errorToast("Could not load data");
				throw new Error("Could not load data");
			}
		} catch {
			console.log("error");
			errorToast("Could not load products");
			throw new Error("Could not load products");
		}
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
			{#each products as product}
				<Product data={product} uid={data.uid} />
			{/each}
		{:catch error}
			<p>error: {error}</p>
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

	/* .red {
		color: red;
	} */
</style>
