import { stripe } from "$lib/server/stripe";
import { prisma } from "$lib/server/prisma";
import { error, json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get("x-api-secret") !== process.env.API_SECRET!) {
		throw error(401, { message: "Unauthorized" });
	}

	console.log("authorized");
	const data = await request.json();

	try {
		const res = await prisma.product.findUnique({
			where: {
				redeemableCode: data.code
			}
		});

		if (!res) {
			console.log("no product found");
			return json({
				status: "INVALID"
			});
		}

		console.log(res);
		console.log(data);

		if (res.ownerUid != data.uid) {
			console.log("UID does not match");
			return json({
				status: "UNAUTHORIZED"
			});
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

			console.log("OK");

			return json({
				status: "OK",
				hook: product.metadata.hook
			});
		} else {
			throw error(500, { message: "No product associated with inventory item" });
		}
	} catch {
		throw error(500, { message: "Error fetching inventory" });
	}
};
