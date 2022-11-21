import { stripe } from "$lib/server/stripe";
import { error } from "@sveltejs/kit";
import { getOrCreateCustomer } from "$lib/server/get_or_create_customer";

import { TOKEN_DURATION, getUrl } from "$lib/constants";
import jwt from "jsonwebtoken";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
	const cookie = cookies.get("session");

	if (!cookie) {
		throw error(400, { message: "No session cookie found" });
	}

	try {
		jwt.verify(cookie, process.env.JWT_SECRET!, {
			maxAge: TOKEN_DURATION
		});
	} catch (err) {
		throw error(400, { message: "Could not verify session cookie" });
	}

	const data = await request.json();
	const priceId = data.priceId;

	const price = await stripe.prices.retrieve(priceId);

	if (price) {
		const session = await stripe.checkout.sessions.create({
			customer: await getOrCreateCustomer(data.uid),
			payment_method_types: price.currency === "brl" ? ["card", "pix"] : ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1 // hard coded for now
				}
			],
			mode: "payment",
			cancel_url: `${getUrl()}/shop`,
			success_url: `${getUrl()}/shop/success/{CHECKOUT_SESSION_ID}`
		});

		return new Response(session.url);
	} else {
		throw error(400, { message: "No product associated with request" });
	}
};
