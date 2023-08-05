import { Redis } from "~/server/redis";
import { type UserQueue } from "~/server/types/message";

const serializeUserQueue = (queue: UserQueue) => {
  return `${queue.userId}`;
};

const deserializeUserQueue = (raw: string) => {
  return {
    userId: raw,
  };
};

const generateKey = (queue: UserQueue, toFind = false) => {
  let key = `QUEUE:${queue.topic}:${queue.isAnonymous ? 1 : 0}:${
    queue.isFindingFriend ? 1 : 0
  }`;
  if (!queue.isFindingFriend) {
    const gender = toFind
      ? queue.gender === "FEMALE"
        ? "MALE"
        : "FEMALE"
      : queue.gender;
    key += `:${gender}`;
  }
  return key;
};

export const findMatch = async (queue: UserQueue) => {
  const key = generateKey(queue, true);
  const redis = Redis.getClient();
  const redlock = Redis.getRedlock();

  let lock = await redlock.acquire([`lock:${key}`], 5000);
  console.log("lock acquired");

  let result;

  try {
    const keyType = await redis.type(key);

    if (keyType !== "list" && keyType !== "none") {
      await redis.del(key);
    }

    const queueLength = await redis.llen(key);

    if (queueLength === 0) {
      if (!queue.isFindingFriend) {
        await lock.release();
        const insertKey = generateKey(queue, false);
        lock = await redlock.acquire([`lock:${insertKey}`], 5000);
        await redis.rpush(insertKey, serializeUserQueue(queue));
      } else {
        await redis.rpush(key, serializeUserQueue(queue));
      }
      result = null;
    } else {
      const match = await redis.lpop(key);
      console.log("popping got");
      console.log(match);
      console.log("remaining");
      console.log(await redis.llen(key));

      if (match === null) {
        throw new Error("Match should not be null");
      }

      const matchQueue = deserializeUserQueue(match);

      result = {
        firstPair: matchQueue,
        secondPair: {
          userId: queue.userId,
        },
      };
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
