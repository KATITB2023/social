import { env } from "~/env.cjs";
import { createClient, type RedisClientType } from "redis";
import Redlock from "redlock";

export type RedisClient = ReturnType<typeof createClient>;

export class Redis {
  private static client: RedisClient;
  private static redlock: Redlock;

  private static async init() {
    if (!Redis.client) {
      const redis = createClient({ url: env.REDIS_URL });
      await redis.connect();
      Redis.client = redis;
    }

    if (!Redis.redlock) {
      Redis.redlock = new Redlock(
        // You should have one client for each independent redis node
        // or cluster.
        [Redis.client],
        {
          // The expected clock drift; for more details see:
          // http://redis.io/topics/distlock
          driftFactor: 0.01, // multiplied by lock ttl to determine drift time

          // The max number of times Redlock will attempt to lock a resource
          // before erroring.
          retryCount: 10,

          // the time in ms between attempts
          retryDelay: 200, // time in ms

          // the max time in ms randomly added to retries
          // to improve performance under high contention
          // see https://www.awsarchitectureblog.com/2015/03/backoff.html
          retryJitter: 200, // time in ms

          // The minimum remaining time on a lock before an extension is automatically
          // attempted with the `using` API.
          automaticExtensionThreshold: 500, // time in ms
        }
      );
    }
  }

  public static async getClient(): Promise<RedisClientType> {
    if (!Redis.client) await Redis.init();

    // the "correct" typing performance was just terrible
    return Redis.client as unknown as RedisClientType;
  }

  public static async getRedlock() {
    if (!Redis.redlock) await Redis.init();

    return Redis.redlock;
  }
}
