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

const generateKey = (queue: UserQueue) => {
  return "QUEUE:";
};

export const findMatch = async (queue: UserQueue) => {
  const key = generateKey(queue);
  const redis = Redis.getClient();
  const redlock = Redis.getRedlock();

  const lock = await redlock.acquire([`lock:${key}`], 5000);
  console.log("lock acquired");

  let result;

  try {
    const keyType = await redis.type(key);

    if (keyType !== "list" && keyType !== "none") {
      await redis.del(key);
    }

    const queueLength = await redis.llen(key);

    if (queueLength === 0) {
      await redis.rpush(key, serializeUserQueue(queue));
      result = null;
    } else {
      const match = await redis.lpop(key);
      console.log("popping got");
      console.log(match);
      console.log("remaining");
      console.log(await redis.llen(key));

      if (!match) {
        await redis.rpush(key, serializeUserQueue(queue));
        result = null;
      } else {
        const matchQueue = deserializeUserQueue(match);

        result = {
          firstPair: matchQueue,
          secondPair: queue,
        };
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.stack);
    }
  } finally {
    await lock.release();
    console.log("lock released");
  }

  return result;
};

export const cancelQueue = async (queue: UserQueue) => {
  const key = generateKey(queue);
  const redis = Redis.getClient();
  const redlock = Redis.getRedlock();

  const lock = await redlock.acquire([`lock:${key}`], 5000);

  try {
    await redis.lrem(key, 0, serializeUserQueue(queue));
  } finally {
    await lock.release();
  }
};
