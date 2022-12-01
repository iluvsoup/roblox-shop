import { stripe } from "$lib/server/stripe";
import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

const createCustomer = async (uid: string) => {
	const customer = await stripe.customers.create({
		metadata: {
			uid: uid
		}
	});

	await prisma.user.update({
		where: { uid: uid },
		data: { stripeCustomerId: customer.id }
	});

	return customer.id;
}

export const getOrCreateCustomer = async (uid: string) => {
	const user = await prisma.user.findUnique({
		where: { uid: uid }
	});

	if (user) {
		if (user?.stripeCustomerId) {
			const customer = await stripe.customers.retrieve(user.stripecustomerId)
			
			if (customer) {
				return user.stripeCustomerId;
			} else {
				// customer id is invalid
				return createCustomer(uid)
			}
		} else {
			return createCustomer(uid)
		}
	} else {
		throw error(500, { message: "Could not find user, please log in again" });
	}
};
