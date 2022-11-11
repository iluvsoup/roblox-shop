import Redis from "ioredis";

const _redis = new Redis(
	process.env.REDIS_URL! /*{
	lazyConnect: true
}*/
);

_redis.quit();

export const redis = _redis;
