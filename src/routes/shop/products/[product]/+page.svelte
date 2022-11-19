<script lang="ts">
	import { goto } from "$app/navigation";
	import { getUrl } from "$lib/constants";
	import type { PageData } from "./$types";

	export let data: PageData;

	// const id = data.productdata.id;
	const price = data.productdata.price;
	const priceObject = data.productdata.priceObject;

	let redirecting = false;

	async function checkout() {
		redirecting = true;

		const res = await fetch(`${getUrl()}/api/checkout`, {
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
	<div class="card">
		<img class="image" src={data.productdata.imageurl} alt="product" />

		<div class="content">
			<h1 class="name">{data.productdata.name}</h1>
			<div class="divider" />

			<div class="price">
				{#if price.symbolOnLeft}
					<p class="pricesymbol left">{price.symbol}</p>
					<p class="pricetext">{price.number}</p>
				{:else}
					<p class="pricetext">{price.number}</p>
					<p class="pricesymbol right">{price.symbol}</p>
				{/if}
			</div>

			<p class="description">{data.productdata.description}</p>

			{#if redirecting == true}
				<button class="buy">Redirecting...</button>
			{:else}
				<button class="buy" on:click={checkout}>BUY NOW!!!</button>
			{/if}
		</div>
	</div>
</template>

<style>
	.card {
		background-color: var(--primary-light);
		border-radius: 0.5rem;
		overflow: hidden;
		width: 100%;
		max-width: 500px;
		box-shadow: 0 0.125rem 0.5rem 0.25rem rgba(0, 0, 0, 0.25);
		margin-right: auto;
		margin-left: auto;
		color: #fff;
	}

	.image {
		width: 100%;
	}

	.content {
		padding-left: 3rem;
		padding-right: 3rem;
		padding-bottom: 1.5rem;
		padding-top: 1rem;
	}

	.name {
		text-align: center;
		font-size: 38px;
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.divider {
		width: 100%;
		height: 2px;
		background-color: #333;
		border-radius: 2px;
	}

	.price {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin-top: 0.5rem;
		margin-bottom: 0;
	}

	.pricesymbol {
		/* user-select: none; */
		display: inline;
		margin: 0;
		padding: 0;
		font-weight: 500;
		font-size: 28px;
	}

	.pricesymbol.left {
		margin-right: 2px;
	}

	.pricesymbol.right {
		margin-left: 2px;
	}

	.pricetext {
		display: inline;
		margin: 0;
		padding: 0;
		text-align: center;
		font-weight: 600;
		font-size: 48px;
		background-image: linear-gradient(var(--secondary-light), var(--secondary-bright));
		-webkit-background-clip: text;
		background-clip: text;
		color: #0000;
	}

	.description {
		text-align: center;
		color: #888;
		font-size: 18px;
		margin-top: 0.5rem;
		width: 25ch;
		margin-left: auto;
		margin-right: auto;
	}

	.buy {
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

	.buy:hover,
	.buy:focus {
		outline: none;
		/* transform: translateY(-0.125rem); */
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
		background-color: #fff;
		border: 1px solid var(--secondary);
		color: var(--secondary);
	}
</style>
