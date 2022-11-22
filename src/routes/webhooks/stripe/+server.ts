import { prisma } from "$lib/server/prisma";
import { stripe } from "$lib/server/stripe";
import { error } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";
import type Stripe from "stripe";

export const POST: RequestHandler = async ({ request }) => {
	let event;
	if (request.headers.has("stripe-signature")) {
		try {
			event = stripe.webhooks.constructEvent(
				await request.text(),
				request.headers.get("stripe-signature")!,
				process.env.WEBHOOK_SECRET!
			);
		} catch (err) {
			throw error(400, { message: "Webhook signature verification failed" });
		}
	} else {
		throw error(400, { message: "Webhook signature missing" });
	}

	const eventType = event.type;
	console.log(eventType);
	switch (eventType) {
		// DO NOT FORGET TO ADD EVENT TO STRIPE DASHBOARD IF YOU'RE ADDING A NEW EVENT HANDLER
		// https://dashboard.stripe.com/webhooks

		// pix failed
		case "checkout.session.async_payment_failed":

		// pix succeded
		case "checkout.session.async_payment_succeeded":

		// checkout session is completed
		// in case of pix, this means that the pix code has been generated
		case "checkout.session.completed":
			const data = event.data;
			const object = data.object as Stripe.Checkout.Session;

			if (!object.customer) {
				throw error(400, { message: "No customer associated with request" });
			}

			const customer = (await stripe.customers.retrieve(object.customer as string)) as Stripe.Customer;

			const uid = customer.metadata.uid;
			const products = await stripe.checkout.sessions.listLineItems(object.id);

			try {
				for (const product of products.data) {
					const uuid = crypto.randomUUID();

					await prisma.user.update({
						where: { uid: uid },
						data: {
							inventory: {
								create: {
									stripeProductId: product.price?.product as string,
									redeemableCode: uuid
								}
							}
						}
					});
				}
			} catch (err) {
				throw error(500, { message: "Failed to add product to inventory" });
			}
			break;
		default:
			break;
	}

	return new Response("200");
};
