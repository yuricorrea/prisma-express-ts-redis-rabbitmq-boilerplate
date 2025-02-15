import { createClient } from 'redis';
import config from './config';

type Redis = ReturnType<typeof createClient>;

class RedisSingleton {
  private static instance: Redis;

  private constructor() {
    //NOTHING
  }

  public static getInstance(): Redis {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = createClient({ url: config.cache.redis });
      RedisSingleton.instance.on('connect', () => console.log('✅ Redis connected'));
      RedisSingleton.instance.on('error', (err) => console.error('❌ Redis error:', err));
      RedisSingleton.instance.connect();
    }

    return RedisSingleton.instance;
  }
}

export const redis = RedisSingleton.getInstance();
