import { redis } from "$lib/server/redis";
import { error } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get("x-api-secret") !== process.env.API_SECRET!) {
		throw error(401, { message: "Unauthorized" });
	}

	const data = await request.json();
	const uuid = crypto.randomUUID();

	// await redis.connect();
	await redis.set(uuid, data.uid);
	await redis.expire(uuid, 3600);
	// redis.disconnect();

	return new Response(uuid);
};

export const DELETE: RequestHandler = async ({ request }) => {
	if (request.headers.get("x-api-secret") !== process.env.API_SECRET!) {
		throw error(401, { message: "Unauthorized" });
	}

	const data = await request.json();

	// await redis.connect();
	await redis.del(data.uuid);
	// redis.disconnect();

	return new Response("OK");
};
