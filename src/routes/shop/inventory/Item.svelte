<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let data: App.Item;

	const dispatch = createEventDispatcher();
</script>

<template>
	<div class="item">
		<img class="image" alt="item" src={data.data.images[0]} />
		<div class="content">
			<p class="name">{data.data.name}</p>

			<button
				class="redeem"
				on:click={() => {
					dispatch("redeem", {
						code: data.code
					});
				}}>REDEEM</button
			>
		</div>
	</div>
</template>

<style>
	.item {
		background-color: var(--primary-light);
		color: #fff;
		border-radius: 0.5rem;
		overflow: hidden;
		transition: transform, box-shadow;
		transition-duration: 0.5s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.item:hover,
	.item:hover {
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

	p {
		margin-top: 0;
	}

	.image {
		width: 100%;
	}

	.name {
		font-size: 24px;
		text-align: center;
	}

	.redeem {
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

	.redeem:hover,
	.redeem:focus {
		outline: none;
		/* transform: translateY(-0.125rem); */
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
		background-color: #fff;
		border: 1px solid var(--secondary);
		color: var(--secondary);
	}
</style>
