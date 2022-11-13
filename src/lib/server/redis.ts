import Redis from "ioredis";

const url = process.env.NODE_ENV == "production" ? process.env.REDIS_URL! : "127.0.0.1:6379";

const _redis = new Redis(url, {
	lazyConnect: true,
	connectTimeout: 600
});

export const redis = _redis;
