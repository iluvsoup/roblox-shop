<script lang="ts">
	import { page } from "$app/stores";
</script>

<template>
	<main>
		<div class="wrapper">
			<img src="https://http.cat/{$page.status}" alt="cat" />
			<div class="text">
				<h1>{$page.error?.message}</h1>
				<a href="/">Return to homepage</a>
			</div>
		</div>
	</main>
</template>

<style>
	main {
		background-color: #000;
		min-height: 100vh; /* hacky */
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
</style>
