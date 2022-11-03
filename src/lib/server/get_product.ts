import { stripe } from "$lib/server/stripe";
import { format } from "$lib/format_currency";

import type Stripe from "stripe";

export const getProduct = async (product: Stripe.Product) => {
	if (!product.default_price) {
		return {
			error: "Could not load price"
		};
	}

	if (!product.active) {
		return {
			error: "Archived product"
		};
	}

	const price = await stripe.prices.retrieve(product.default_price.toString());
	const iso = price.currency.toUpperCase();

	if (!price.unit_amount) {
		return {
			error: "Could not load currency amount"
		};
	}

	const priceString = format(iso, price.billing_scheme, price.unit_amount);

	return {
		id: product.id,
		imageurl: product.images[0],
		description: product.description,
		name: product.name,
		price: priceString,
		priceObject: price
	};
};
