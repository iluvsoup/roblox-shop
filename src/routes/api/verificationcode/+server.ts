import { redis } from "$lib/server/redis";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const uuid = crypto.randomUUID();

	console.log(request);

	await redis.connect();
	await redis.set(uuid, data.uid);
	// await redis.expire(uuid, 600)
	redis.disconnect();

	return new Response(uuid);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();

	await redis.connect();
	await redis.del(data.uuid);
	redis.disconnect();

	return new Response("OK");
};
