// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}

	interface Product {
		id: string;
		imageurl: string;
		description: string;
		name: string;
		price: { number: string; symbol: string; symbolOnLeft: boolean };
		priceObject: import("stripe").Stripe.Price;
	}

	interface Item {
		code: string;
		data: import("stripe").Stripe.Product;
	}

	interface Route {
		name: string;
		link: string;
	}
}
