import { RedisOptions } from 'ioredis';

interface ICacheconfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT, // Redis port
      family: 4, // 4 (IPv4) or 6 (IPv6)
      db: process.env.REDIS_CACHE_DB,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheconfig;
