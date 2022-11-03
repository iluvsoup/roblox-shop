<script lang="ts">
	import Product from "./product.svelte";
	import type { PageData } from "./$types";

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
			{:catch err}
				<p class="red">Could not load data</p>
				<p class="red">{err}</p>
			{/await}
		{:catch err}
			<p class="red">Could not load products</p>
			<p class="red">{err}</p>
		{/await}
	</div>
</template>

<style>
	.products {
		display: flex;
		flex-wrap: wrap;
		margin-top: 1rem;
		gap: 0.5rem;
	}

	.red {
		color: red;
	}
</style>
