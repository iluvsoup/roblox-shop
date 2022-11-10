import { stripe } from "$lib/server/stripe";
import { getProduct } from "$lib/server/get_product";
import { error, json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	throw error(500, { message: "test" });
	const products = await stripe.products.list({ limit: 100 }); // Hard coded cuz pagination is for nerds
	const productdata: App.Product[] = [];

	for (const product of products.data) {
		const data = await getProduct(product);

		if (data.error) {
			// console.warn("[!]: " + data.error);
		} else {
			productdata.push(data as App.Product);
		}
	}

	return json(productdata);
};
