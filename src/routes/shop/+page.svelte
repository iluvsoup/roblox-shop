<script lang="ts">
	import Product from "./Product.svelte";
	import type { PageData } from "./$types";
	import { errorToast } from "$lib/toast";

	export let data: PageData;

	const productsPromise = fetch("/api/products");
</script>

<svelte:head>
	<title>Shop</title>
	<meta name="description" content="Web shop" />
</svelte:head>

<template>
	<h1>Products</h1>

	<div class="products">
		<!-- Not my proudest moment -->
		{#await productsPromise}
			<p>Loading products</p>
		{:then response}
			{#await response.json()}
				<p>Getting data</p>
			{:then products}
				{#each products as product}
					<Product data={product} uid={data.uid} />
				{/each}
			{:catch}
				{@html errorToast("Could not load data")}
			{/await}
		{:catch}
			{@html errorToast("Could not load products")}
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
