import { stripe } from "$lib/server/stripe";
import { format } from "$lib/format_currency";

import type Stripe from "stripe";

export const getProduct = async (product: Stripe.Product) => {
	if (!product.default_price || !product.active) {
		return;
	}

	const stripePrice = await stripe.prices.retrieve(product.default_price.toString());
	const iso = stripePrice.currency.toUpperCase();

	if (!stripePrice.unit_amount || stripePrice.recurring || stripePrice.billing_scheme == "tiered") {
		return;
	}

	const price = format(iso, stripePrice.unit_amount);
	const data: App.Product = {
		id: product.id,
		imageurl: product.images[0],
		description: product.description || "No description available",
		name: product.name,
		price: price,
		priceObject: stripePrice
	};

	return data;
};
