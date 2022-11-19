<script lang="ts">
	import { goto } from "$app/navigation";
	import { getUrl } from "$lib/constants";

	export let data: App.Product;
	export let uid: string;

	const id = data.id;

	const price = data.price;
	const priceObject = data.priceObject;

	let redirecting = false;

	async function checkout() {
		redirecting = true;

		const res = await fetch(`${getUrl()}/api/checkout`, {
			method: "POST",
			body: JSON.stringify({
				priceId: priceObject.id,
				uid: uid,
				mode: priceObject.type == "recurring" ? "subscription" : "payment"
			})
		});

		if (res.ok) {
			const url = await res.text();
			goto(url);
		}
	}
</script>

<template>
	<div class="container">
		<a href={`/shop/products/${id}`}>
			<img class="image" src={data.imageurl} alt="Product" />
		</a>

		<div class="content">
			<p class="name">{data.name}</p>

			<div class="price">
				{#if price.symbolOnLeft}
					<p class="pricesymbol left">{price.symbol}</p>
					<p class="pricetext">{price.number}</p>
				{:else}
					<p class="pricetext">{price.number}</p>
					<p class="pricesymbol right">{price.symbol}</p>
				{/if}
			</div>

			{#if redirecting == true}
				<button class="buy">Redirecting...</button>
			{:else}
				<button class="buy" on:click={checkout}>BUY NOW</button>
			{/if}
		</div>
	</div>
</template>

<style>
	.container {
		background-color: var(--primary-light);
		border-radius: 0.5rem;
		transition: transform, box-shadow;
		transition-duration: 0.5s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		color: #fff;
	}

	.container:hover {
		transform: scale(105%);
		z-index: 2;
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
	}

	.content {
		padding-top: 1rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-bottom: 1.5rem;
	}

	.name {
		margin-bottom: 0;
		margin-top: 0;
		text-align: center;
		font-size: 24px;
	}

	.image {
		width: 100%;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		cursor: pointer;
	}

	.price {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin-top: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.pricesymbol {
		/* user-select: none; */
		display: inline;
		margin: 0;
		padding: 0;
		font-weight: 500;
		font-size: 22px;
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
		font-size: 36px;
		background-image: linear-gradient(var(--secondary-light), var(--secondary-bright));
		-webkit-background-clip: text;
		background-clip: text;
		color: #0000;
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
