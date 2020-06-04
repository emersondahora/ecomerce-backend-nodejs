import { ClientOpts } from 'redis';

interface ICacheconfig {
  driver: 'redis';

  config: {
    redis: ClientOpts;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT, // Redis port
      db: process.env.REDIS_RATELIMITER_DB,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheconfig;
