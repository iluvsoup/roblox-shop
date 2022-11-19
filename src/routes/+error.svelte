<script lang="ts">
	import { page } from "$app/stores";
</script>

<template>
	<div class="wrapper">
		<img src="https://http.cat/{$page.status}" alt="cat" />
		<div class="text">
			<h1>{$page.error?.message}</h1>
			<a href="/">Return to homepage</a>
		</div>
	</div>
</template>

<style>
	:global(body) {
		background-color: #000;
	}

	img {
		width: 100%;
		max-width: 900px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.text {
		transform: translateY(-25%);
	}

	h1,
	a {
		margin-top: 0;
		color: #fff;
		display: block;
		text-align: center;
	}

	h1 {
		margin-bottom: 0.5rem;
	}

	a {
		margin-bottom: 2rem;
	}
</style>
