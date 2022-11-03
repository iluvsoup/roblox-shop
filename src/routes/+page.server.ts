import { invalid, error, redirect } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";
import { prisma } from "$lib/server/prisma";
import { sign, verify } from "jsonwebtoken";

import { JWT_SECRET } from "$env/static/private";
import { TOKEN_DURATION } from "$lib/constants";

import type { PageServerLoad, Actions } from "./$types";

export const ssr = true;

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get("session");

	if (session) {
		try {
			verify(session, JWT_SECRET, { maxAge: TOKEN_DURATION });
		} catch (err) {
			cookies.delete("session");
			return;
			// throw error(400, { message: "Invalid session token" })
		}

		throw redirect(303, "/shop");
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const uuid = data.get("uuid");

		if (!uuid) {
			return invalid(400, { uuid, missing: true });
		}

		await redis.connect();
		const uid = await redis.get(uuid.toString(), (err, result) => {
			if (err) {
				redis.disconnect();
				throw error(500, err);
			} else {
				return result;
			}
		});
		// redis.disconnect()

		if (!uid) {
			redis.disconnect();
			return invalid(400, { uuid, incorrect: true });
		}

		// the way they handle callbacks makes it hard for error handling and showing a loading spinner for example
		const token = sign({ uid: uid }, JWT_SECRET, { expiresIn: TOKEN_DURATION });

		if (!token) {
			redis.disconnect();
			throw error(500, { message: "Could not generate session token" });
		}

		// await redis.connect()
		await redis.del(uuid.toString());
		redis.disconnect();

		try {
			const doesUserExist = await prisma.user.findUnique({
				where: { uid: uid }
			});

			if (!doesUserExist) {
				await prisma.user.create({
					data: {
						uid: uid
					}
				});
			}
		} catch {
			throw error(500, { message: "Failed to create user" });
		}

		cookies.set("session", token, {
			secure: true,
			httpOnly: true,
			expires: new Date(Date.now() + TOKEN_DURATION * 1000),
			maxAge: TOKEN_DURATION
		});

		throw redirect(303, "/shop");
	}
};
