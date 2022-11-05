import { stripe } from "$lib/server/stripe";
import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get("x-api-secret") !== process.env.API_SECRET!) {
		throw error(401, { message: "Unauthorized" });
	}

	const data = await request.json();

	try {
		const res = await prisma.product.findUnique({
			where: {
				redeemableCode: data.code
			}
		});

		if (!res) {
			return new Response(
				JSON.stringify({
					status: "INVALID"
				})
			);
		}

		if (res.ownerUid != data.uid) {
			return new Response(
				JSON.stringify({
					status: "UNAUTHORIZED"
				})
			);
		}

		const product = await stripe.products.retrieve(res.stripeProductId);

		if (product) {
			try {
				await prisma.product.delete({
					where: {
						redeemableCode: data.code
					}
				});
			} catch {
				throw error(500, { message: "Failed to delete product from inventory" });
			}

			return new Response(
				JSON.stringify({
					status: "OK",
					hook: product.metadata.hook
				})
			);
		} else {
			throw error(500, { message: "No product associated with inventory item" });
		}
	} catch {
		throw error(500, { message: "Error fetching inventory" });
	}
};
