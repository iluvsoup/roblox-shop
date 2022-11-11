import { invalid, error, redirect } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";
import { prisma } from "$lib/server/prisma";

import jwt from "jsonwebtoken";

import { TOKEN_DURATION } from "$lib/constants";

import type { PageServerLoad, Actions } from "./$types";

export const ssr = true;

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get("session");

	if (session) {
		try {
			jwt.verify(session, process.env.JWT_SECRET!, { maxAge: TOKEN_DURATION });
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
		// console.log("action");
		const data = await request.formData();
		const uuid = data.get("uuid");

		if (!uuid) {
			return invalid(400, { uuid, missing: true });
		}

		// console.log("a");
		await redis.connect();

		const uid = await redis.get(uuid.toString(), (err, result) => {
			if (err) {
				redis.quit();
				throw error(500, err);
			} else {
				return result;
			}
		});

		redis.quit();
		// console.log("disconnected a");

		if (!uid) {
			redis.quit();
			return invalid(400, { uuid, incorrect: true });
		}

		// the way they handle callbacks makes it hard for error handling and showing a loading spinner for example
		const token = jwt.sign({ uid: uid }, process.env.JWT_SECRET!, { expiresIn: TOKEN_DURATION });

		if (!token) {
			redis.quit();
			throw error(500, { message: "Could not generate session token" });
		}

		// console.log("b");

		await redis.connect();
		await redis.del(uuid.toString());
		redis.quit();
		// console.log("disconnected");
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
		} catch (err) {
			console.log(`FAILED TO CREATE USER: ${err}`);
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
