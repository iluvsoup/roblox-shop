<script lang="ts">
	import { page } from "$app/stores";
</script>

<template>
	<div class="wrapper">
		<img src="https://http.cat/{$page.status}" alt="cat" />
		<h1>{$page.error?.message}</h1>
		<a href="/">Return to homepage</a>
	</div>
</template>

<style>
	.wrapper {
		max-width: 1000px;
		margin-left: auto;
		margin-right: auto;
	}

	img {
		width: 100%;
	}

	h1,
	a {
		display: block;
		text-align: center;
	}

	h1 {
		margin-bottom: 0.5rem;
	}
</style>
