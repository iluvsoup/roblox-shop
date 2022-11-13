<script lang="ts">
	import { page } from "$app/stores";

	export let routes: App.Route[];

	let visible: boolean;
	let moveSmooth = false;

	let highlightOffset: number;
	let highlightWidth: number;

	const show = (event: any) => {
		const target = event.target.children.text;

		if (visible) {
			moveSmooth = true;
		} else {
			moveSmooth = false;
		}

		visible = true;

		highlightOffset = target.offsetLeft;
		highlightWidth = target.offsetWidth;
	};

	const stopHover = () => {
		visible = false;
	};
</script>

<nav>
	<div
		class="highlight"
		class:visible
		class:moveSmooth
		style="left: {highlightOffset}px; width: {highlightWidth}px"
	/>

	<div class="links" on:mouseleave={stopHover} on:focus>
		{#each routes as route}
			<a on:mouseenter={show} tabindex="0" href={route.link}>
				<div class="linktext" id="text" class:current={$page.route.id === route.link}>
					{route.name}
				</div>
			</a>
		{/each}
	</div>

	<div class="logout">
		<form method="POST" action="?/shop">
			<button formaction="?/logout">Log out</button>
		</form>
	</div>
</nav>

<style>
	nav {
		width: 100%;
		height: 100%;
		display: flex;
		margin: 0;
		padding: 0;
		align-items: center;
	}

	.links {
		display: flex;
		z-index: 2;
		height: 100%;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		padding-right: 4px;
		padding-left: 4px;
	}

	a:hover > div,
	a:focus > div {
		color: #fff;
	}

	.linktext {
		padding: 4px 12px;
		text-align: center;
		color: #888;
		transition: color 0.15s ease;
		font-size: 18px;
	}

	.linktext.current {
		color: #fff;
		border-radius: 0.5rem;
		outline: solid 2px #333;
	}

	.highlight {
		border-radius: 0.5rem;
		z-index: 1;
		background-color: #333;
		height: 36px;
		position: absolute;
		opacity: 0;
		transition-property: opacity;
		transition-timing-function: ease;
		transition-duration: 0.15s;
	}

	.highlight.visible {
		opacity: 1;
	}

	.highlight.moveSmooth {
		transition-property: all;
	}

	form {
		display: inline;
	}

	button {
		height: 2rem;
		border-radius: 0.5rem;
		padding-left: 10px;
		padding-right: 10px;
		border: none;
		background-color: var(--secondary);
		transition: transform 0.5s ease, box-shadow, 0.5s ease;
		border: 1px solid var(--secondary);
		color: #fff;
		font-family: Poppins;
		font-weight: 600;
		cursor: pointer;
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

	.logout {
		margin-left: auto;
	}
</style>
