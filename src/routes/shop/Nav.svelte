<script lang="ts">
  export let routes: App.Route[];

  let hovering = false;
	let focusing = false;
	
	// let visible = false;
	$: visible = hovering || focusing;
	
	let moveSmooth = false;
	let highlightOffset: number;
	let highlightWidth: number;
	let previousTarget: any;
	
	// const updateVisible = () => {
	// 	if (hovering || focusing) {
	// 		visible = true;
	// 	} else {
	// 		visible = false;
	// 	}
	// }
	
	const mouseOver = (event: any) => {
		if (!visible) {
			moveSmooth = false;
		} else {
			moveSmooth = true;
		}
		
		if (previousTarget && previousTarget.id == "navitem") {
			previousTarget.blur();
		}
		
		highlightOffset = event.target.offsetLeft;
		highlightWidth = event.target.offsetWidth;
		
		previousTarget = event.target
	}
	
	const focusIn = (event: any) => {
		focusing = true;
		mouseOver(event);
	}
	
	const focusOut = (event: any) => {
		if (!event.relatedTarget || event.relatedTarget.id !== "navitem") {
			focusing = false;
		}
	}
	
	const hover = () => {
		hovering = true
	}
	
	const stopHover = () => {
		hovering = false
	}
</script>

<!--<nav>
		<ul>
			<li><a href="/shop">Shop</a></li>
			<li><a href="/shop/inventory">Inventory</a></li>
			<li>
				<form method="POST" action="?/shop">
					<button formaction="?/logout">Log out</button>
				</form>
			</li>
		</ul>
	</nav>-->

<nav>
  <ul>
    <div
      class="highlight"
      class:visible
      class:moveSmooth
      style="left: {highlightOffset}px; width: {highlightWidth}px"
    ></div>

    <div
      class="links"
      on:mouseover={hover}
      on:mouseleave={stopHover}
      on:focusout={focusOut}
    >
      {#each routes as route}
        <li>
          <a
            tabindex="0"
            id="navitem"
            on:mouseover={mouseOver}
            on:focusin={focusIn}
            href={route.link}
          >
            {route.name}
          </a>
        </li>
      {/each}
    </div>

    <li class="logout">
      <form method="POST" action="?/shop">
        <button formaction="?/logout">Log out</button>
      </form>
    </li>
  </ul>
</nav>

<style>
  nav {
    width: 100%;
    height: 100%;
  }

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		align-items: center;
	}
	
	.links {
		display: flex;
    z-index: 2;
		height: 100%;
		align-items: center;
	}
	
	a {
		color: #888;
		padding: 16px 12px;
    text-decoration: none;
		transition: color 0.15s ease;
	}
	
	a:hover, a:focus {
		outline: none;
		color: #fff;
	}
	
	.highlight {
		border-radius: 4px;
		z-index: 1;
		background-color: #333;
		height: 2rem;
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

  .logout {
    margin-left: auto;
  }
</style>