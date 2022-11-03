<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<header>
	<img class="avatar" src={data.avatarurl} alt="Roblox avatar" />
	<nav>
		<ul>
			<li><a href="/shop">Shop</a></li>
			<li><a href="/shop/inventory">Inventory</a></li>
			<li>
				<form method="POST" action="?/shop">
					<button formaction="?/logout">Log out</button>
				</form>
			</li>
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<style>
	.avatar {
		border-radius: 50%;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #ccc;
	}

	nav {
		flex-grow: 1;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	form {
		display: inline;
	}

	li:nth-of-type(3) {
		margin-left: auto;
	}

	button {
		width: 5rem;
		height: 2rem;
		border-radius: 0.5rem;
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
</style>
