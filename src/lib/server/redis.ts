import Redis from "ioredis";
import { REDIS_URL } from "$env/static/private";

const _redis = new Redis(REDIS_URL);
_redis.disconnect();

export const redis = _redis;
