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
	const mode = data.mode;

	// const URL = process.env.NODE_ENV == "development" ? "192.168.1.156:5173" : "shop.iluvsoup.com";
	const session = await stripe.checkout.sessions.create({
		cancel_url: `${getUrl()}/shop`,
		success_url: `${getUrl()}/shop/success/{CHECKOUT_SESSION_ID}`,
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
