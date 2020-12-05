import * as redis from 'redis';
import JSONCache from 'redis-json';

export const redisClient = redis.createClient(process.env.REDIS_URL as string);

export const jsonRedis = new JSONCache<{}>(redisClient);
