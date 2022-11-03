<script lang="ts">
	import Particles from "svelte-particles/src/Particles.svelte";
	import { loadSlim } from "tsparticles-slim";
	import { errorToast } from "$lib/toast";

	import type { ActionData } from "./$types";
	import type { Engine, ISourceOptions } from "tsparticles-engine";

	export let form: ActionData;

	let particlesConfig: ISourceOptions = {
		fullScreen: {
			enable: true,
			zIndex: -1
		},
		particles: {
			move: {
				enable: true,
				speed: { min: 0.4, max: 1 },
				noise: {
					enable: true
				}
			},
			size: {
				value: { min: 1, max: 1.5 }
			},
			opacity: {
				animation: {
					enable: true,
					startValue: "max",
					minimumValue: 0,
					speed: { min: 0.4, max: 1 }
				}
			}
		}
	};

	let particlesInit = async (engine: Engine) => {
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size

		engine.loadFromArray("tsparticles", [particlesConfig]);

		await loadSlim(engine);
	};

	if (form?.missing) {
		errorToast("You must enter a verification code!");
	}

	if (form?.incorrect) {
		errorToast("Invalid verification code! It might be expired, try refreshing it in Roblox!");
	}
</script>

<svelte:head>
	<title>Verify your Roblox account</title>
	<meta name="description" content="Homepage" />
</svelte:head>

<template>
	<Particles id="tsparticles" options={particlesConfig} {particlesInit} />

	<main>
		<div class="content">
			<h1>Verify your Roblox account</h1>
			<p class="subtitle">Input the verification code you recieved in-game</p>

			<form method="POST" autocomplete="off">
				<input name="uuid" type="text" aria-label="Verification code" />
				<button>Verify!</button>
			</form>
		</div>
	</main>
</template>

<style>
	:global(body) {
		background-image: linear-gradient(var(--primary), var(--primary-dark));
		color: #fff;
	}

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 5rem;
		padding-right: 5rem;
		height: 100vh;
	}

	h1 {
		margin-top: 0;
		margin-bottom: 0;
		text-align: center;
	}

	.subtitle {
		margin-top: 0;
		text-align: center;
	}

	form {
		display: flex;
		justify-content: center;
	}

	input,
	button {
		font-family: Poppins;
	}

	button {
		width: 5rem;
		height: 2rem;
		margin-left: 0.5rem;
		background-color: var(--secondary);
		border-radius: 0.5rem;
		border: 1px solid var(--secondary);
		color: #fff;
		cursor: pointer;
		font-weight: 600;
		transition: transform 0.5s ease, box-shadow, 0.5s ease;
	}

	button:hover,
	button:focus {
		outline: none;
		transform: translateY(-0.125rem);
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
		background-color: #fff;
		border: 1px solid var(--secondary);
		color: var(--secondary);
	}

	input {
		border: none;
		border-radius: 0.5rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		transition: transform 0.5s ease, box-shadow, 0.5s ease;
	}

	input:focus {
		transform: translateY(-0.125rem);
		box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.25);
		background-color: #fff;
		outline: none;
	}
</style>
