import { stripe } from "$lib/server/stripe";
import { prisma } from "$lib/server/prisma";

export const getOrCreateCustomer = async (uid: string) => {
	const user = await prisma.user.findUnique({
		where: { uid: uid }
	});

	if (user?.stripeCustomerId) {
		// return stripe.customers.retrieve(user.stripeCustomerId);
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
};
