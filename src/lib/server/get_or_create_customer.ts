import { stripe } from "$lib/server/stripe";
import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

export const getOrCreateCustomer = async (uid: string) => {
	const user = await prisma.user.findUnique({
		where: { uid: uid }
	});

	if (user) {
		if (user?.stripeCustomerId) {
			return user.stripeCustomerId;
		} else {
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
	} else {
		throw error(500, { message: "Could not find user, please log in again" });
	}
};
