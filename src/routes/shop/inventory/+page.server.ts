// load from prisma
// get product information
// maybe regenerate uuid button

import { prisma } from "$lib/server/prisma";
import { stripe } from "$lib/server/stripe";
import { verify } from "jsonwebtoken";

import { JWT_SECRET } from "$env/static/private";
import { TOKEN_DURATION } from "$lib/constants";

import type { PageServerLoad } from "./$types";

// Stupid thing was complaining so I had to do this
interface Token {
	uid: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get("session");
	const decoded = verify(session!, JWT_SECRET, { maxAge: TOKEN_DURATION }) as Token;

	const uid = decoded.uid;
	const products = await prisma.product.findMany({ where: { ownerUid: uid } });

	const productdata = [];

	for (const product of products) {
		const data = await stripe.products.retrieve(product.stripeProductId);
		productdata.push({
			data: data,
			code: product.redeemableCode
		});
	}

	return {
		products: productdata
	};
};
