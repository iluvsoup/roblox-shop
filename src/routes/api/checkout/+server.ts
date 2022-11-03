import { stripe } from "$lib/server/stripe";
import { URL } from "$lib/constants";

import type { RequestHandler } from "./$types";
import { getOrCreateCustomer } from "$lib/server/get_or_create_customer";

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const priceId = data.priceId;
	const mode = data.mode;

	const session = await stripe.checkout.sessions.create({
		cancel_url: `${URL}/shop`,
		success_url: `${URL}/shop/success/{CHECKOUT_SESSION_ID}`,
		customer: await getOrCreateCustomer(data.uid),
		mode: mode,
		line_items: [
			{
				price: priceId,
				quantity: 1 // hard coded for now
			}
		]
	});

	return new Response(session.url);
};
