import { prisma } from "$lib/server/prisma";
import { stripe } from "$lib/server/stripe";
import { error, json } from "@sveltejs/kit";

import jwt from "jsonwebtoken";
import { TOKEN_DURATION } from "$lib/constants";

import type { RequestHandler } from "./$types";

// Stupid thing was complaining so I had to do this
interface Token {
	uid: string;
}

export const GET: RequestHandler = async ({ cookies }) => {
	const session = cookies.get("session");

	if (!session) {
		throw error(401, { message: "No user associated with request" });
	}

	let decoded;

	try {
		decoded = jwt.verify(session!, process.env.JWT_SECRET!, {
			maxAge: TOKEN_DURATION
		}) as Token;
	} catch {
		throw error(400, { message: "Invalid session token" });
	}

	const uid = decoded.uid;
	let products;

	try {
		products = await prisma.product.findMany({ where: { ownerUid: uid } });
	} catch (err) {
		console.log(`ERROR FETCHING INVENTORY: ${err}`);
		throw error(500, { message: "Could not load inventory" });
	}

	const productdata = [];

	for (const product of products) {
		const data = await stripe.products.retrieve(product.stripeProductId);
		productdata.push({
			data: data,
			code: product.redeemableCode
		});
	}

	return json({
		products: productdata
	});
};
