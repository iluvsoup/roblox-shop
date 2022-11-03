import Redis from "ioredis";
console.log(process.env);
// import { REDIS_URL } from "$env/static/private";
const _redis = new Redis(process.env.REDIS_URL!);
_redis.disconnect();

export const redis = _redis;
