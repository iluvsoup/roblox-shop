import Redis from "ioredis";

const _redis = new Redis();
_redis.disconnect();

export const redis = _redis;
