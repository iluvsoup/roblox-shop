import { stripe } from "$lib/server/stripe";
import { getProduct } from "$lib/server/get_product";
import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = params.product;
	let product;

	try {
		product = await stripe.products.retrieve(id);
	} catch (err) {
		throw error(404, { message: "Product not found" });
	}

	const productdata = await getProduct(product);

	if (productdata.error) {
		throw error(500, { message: productdata.error });
	}

	return { productdata: productdata as App.Product };
};
