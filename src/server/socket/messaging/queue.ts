import { type UserQueue } from "~/server/types/message";
import { Redis } from "~/server/redis";

const serializeUserQueue = (queue: UserQueue) => {
  return `${queue.userId}`;
};

const deserializeUserQueue = (raw: string): UserQueue => {
  return {
    userId: raw,
  };
};

export const findMatch = async (queue: UserQueue) => {
  const key = "QUEUE:";
  const redis = await Redis.getClient();
  const redlock = await Redis.getRedlock();

  const lock = await redlock.acquire([key], 5000);

  let result;

  try {
    const queueLength = await redis.LLEN(key);

    if (queueLength === 0) {
      await redis.RPUSH(key, serializeUserQueue(queue));
      result = null;
    } else {
      const match = await redis.LPOP(key);

      if (match === null) {
        await redis.RPUSH(key, serializeUserQueue(queue));
        result = null;
      } else {
        const matchQueue = deserializeUserQueue(match);

        result = {
          firstPair: matchQueue,
          secondPair: queue,
        };
      }
    }
  } finally {
    await lock.release();
  }

  return result;
};
