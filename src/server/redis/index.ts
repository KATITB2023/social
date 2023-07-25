import { env } from "~/env.cjs";
import Redlock, { ResourceLockedError } from "redlock";
import RedisClient from "ioredis";

export class Redis {
  private static client: RedisClient;
  private static redlock: Redlock;

  private static init() {
    if (!Redis.client) {
      Redis.client = new RedisClient(env.REDIS_URL);
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

      Redis.redlock.on("error", (error) => {
        // Ignore cases where a resource is explicitly marked as locked on a client.
        if (error instanceof ResourceLockedError) {
          return;
        }

        // Log all other errors.
        console.error(error);
      });
    }
  }

  public static getClient(): RedisClient {
    if (!Redis.client) Redis.init();

    // the "correct" typing performance was just terrible
    return Redis.client;
  }

  public static getRedlock() {
    if (!Redis.redlock) Redis.init();

    return Redis.redlock;
  }
}
