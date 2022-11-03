<script lang="ts">
	import { goto } from "$app/navigation";

	export let data: App.Product;
	export let uid: string;

	const id = data.id;

	const price = data.price;
	const priceObject = data.priceObject;

	let redirecting = false;

	async function checkout() {
		redirecting = true;

		const res = await fetch("/api/checkout", {
			method: "POST",
			body: JSON.stringify({
				priceId: priceObject.id,
				uid: uid,
				mode: priceObject.type == "recurring" ? "subscription" : "payment"
			})
		});

		const url = await res.text();
		goto(url);
	}
</script>

<template>
	<div class="container">
		<img
			class="image"
			src={data.imageurl}
			alt="Product"
			on:click={() => goto(`/shop/products/${id}`)}
		/>
		<p class="name">{data.name}</p>

		{#if priceObject.type == "recurring"}
			<p class="green pricetext">
				{price} every
				{#if priceObject.recurring?.interval_count == 1}
					{priceObject.recurring?.interval}
				{:else}
					{priceObject.recurring?.interval_count} {priceObject.recurring?.interval}s
				{/if}
			</p>
		{:else}
			<p class="green pricetext">{price}</p>
		{/if}

		{#if redirecting == true}
			<button class="buy">Redirecting...</button>
		{:else}
			<button class="buy" on:click={checkout}>BUY NOW!!!</button>
		{/if}
	</div>
</template>

<style>
	.container {
		width: 15rem;
		background-color: #eee;
		height: 20rem;
		transition: transform, box-shadow;
		transition-duration: 0.25s;
		transition-timing-function: ease;
	}

	.container:hover {
		transform: scale(105%);
		z-index: 2;
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
	}

	.name {
		margin-bottom: 0;
		text-align: center;
	}

	.image {
		width: 100%;
		height: 50%;
		cursor: pointer;
	}

	.green {
		color: green;
	}

	.pricetext {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		text-align: center;
		font-size: 1.5rem;
	}

	.buy {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
</style>
