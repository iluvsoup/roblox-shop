import Redis from "ioredis";

const _redis = new Redis(process.env.REDIS_URL!, {
	lazyConnect: true,
	connectTimeout: 600
});

// _redis.quit();

export const redis = _redis;
