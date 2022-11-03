import Redis from "ioredis";

const _redis = new Redis(process.env.REDIS_URL!);
_redis.disconnect();

export const redis = _redis;
