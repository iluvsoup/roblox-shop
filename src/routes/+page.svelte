<script lang="ts">
	import Particles from "svelte-particles/src/Particles.svelte";
	import { errorToast } from "$lib/toast";
	import { loadParticles } from "$lib/particles";

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
					startValue: "random",
					minimumValue: 0,
					speed: { min: 0.4, max: 1 }
				}
			}
		}
	};

	let particlesInit = async (engine: Engine) => {
		await loadParticles(engine);
	};

	if (form?.missing) {
		errorToast("You must enter a verification code!");
	}

	if (form?.incorrect) {
		errorToast("Invalid verification code! It might be expired, try refreshing it in Roblox!");
	}

	if (form?.error) {
		errorToast(form.error);
	}
</script>

<svelte:head>
	<title>Verify your Roblox account</title>
	<meta name="description" content="Homepage" />
</svelte:head>

<template>
	<div class="particles">
		<Particles id="tsparticles" options={particlesConfig} {particlesInit} />
	</div>

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

	<footer>
		<a class="footer" href="https://github.com/iluvsoup">Made by iluvsoup</a>
	</footer>
</template>

<style>
	.particles {
		position: sticky;
	}

	main {
		background-image: linear-gradient(var(--primary), var(--primary-dark));
		color: #fff;
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

	footer {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		width: 100vw;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2rem;
	}

	.footer {
		text-align: center;
		margin: 0;
		padding: 0;
		color: #fff;
		text-decoration: none;
		display: inline;
	}

	/* weirdest css I've written in my life */
	.footer::after {
		content: "";
		height: 2px;
		width: 0%;
		transform: translate(-50%, 0);
		left: 50%;
		display: block;
		position: absolute;
		background: #fff;
		transition: width 0.25s ease;
	}

	.footer:hover::after {
		width: 9rem;
	}
</style>
