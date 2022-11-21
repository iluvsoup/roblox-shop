<svelte:head>
	<title>FAQ</title>
	<meta name="description" content="Frequently asked questions" />
</svelte:head>

<template>
	<h1>FAQ</h1>
	<div class="bar" />

	<section>
		<h2>Question</h2>
		<p>Answer</p>
	</section>

	<section>
		<h2>Question 2</h2>
		<p>Answer 2</p>
	</section>
</template>

<style>
	h1 {
		color: #fff;
		font-size: 48px;
		margin-top: 2rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.bar {
		display: block;
		margin-left: auto;
		margin-right: auto;
		height: 4px;
		width: 8rem;
		background-color: #333;
		border-radius: 4px;
		margin-bottom: 2rem;
	}

	section {
		padding-left: 2rem;
		padding-right: 2rem;
		border-top: solid 2px #333;
	}

	h2 {
		font-size: 32px;
		color: #fff;
		margin-bottom: 0;
		margin-top: 2rem;
	}

	p {
		color: #fff;
		margin-bottom: 2rem;
	}
</style>
