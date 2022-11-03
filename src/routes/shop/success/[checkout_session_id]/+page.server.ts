import { stripe } from "$lib/server/stripe";
import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const checkoutSessionId = params.checkout_session_id;
	let session;

	try {
		session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
	} catch (err) {
		throw error(404, { message: "Could not find that checkout session" });
	}
};
