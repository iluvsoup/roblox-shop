<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";

	export let data: PageData;

	// const id = data.productdata.id;
	const price = data.productdata.price;
	const priceObject = data.productdata.priceObject;

	let redirecting = false;

	async function checkout() {
		redirecting = true;

		const res = await fetch("/api/checkout", {
			method: "POST",
			body: JSON.stringify({
				priceId: priceObject.id,
				uid: data.uid,
				mode: priceObject.type == "recurring" ? "subscription" : "payment"
			})
		});

		const url = await res.text();
		goto(url);
	}
</script>

<svelte:head>
	<title>{data.productdata.name}</title>
	<meta name="description" content={data.productdata.description} />
</svelte:head>

<template>
	<img class="productimage" src={data.productdata.imageurl} alt="product" />
	<h1>{data.productdata.name}</h1>

	{#if priceObject.type == "recurring"}
		<h1 class="green pricetext">
			{price} every
			{#if priceObject.recurring?.interval_count == 1}
				{priceObject.recurring?.interval}
			{:else}
				{priceObject.recurring?.interval_count} {priceObject.recurring?.interval}s
			{/if}
		</h1>
	{:else}
		<h1 class="green pricetext">{price}</h1>
	{/if}

	{#if redirecting == true}
		<button>Redirecting...</button>
	{:else}
		<button on:click={checkout}>BUY NOW!!!</button>
	{/if}
</template>

<style>
	.productimage {
		width: 15rem;
	}

	.green {
		color: green;
	}
</style>
