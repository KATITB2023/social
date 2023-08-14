import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createEvent } from "~/server/socket/helper";
import {
  cancelQueue,
  findMatch,
  generateQueueKey,
} from "~/server/socket/messaging/queue";
import { ChatTopic, type UserQueue } from "~/server/types/message";
import { Redis } from "~/server/redis";
import { type UserMatch } from "@prisma/client";
import { askingRevealSet } from "../state";

export const findMatchEvent = createEvent(
  {
    name: "findMatch",
    input: z.object({
      isAnonymous: z.boolean(),
      topic: z.nativeEnum(ChatTopic),
      isFindingFriend: z.boolean(),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    if (ctx.client.data.matchQueue) {
      return;
    }
    const userSession = ctx.client.data.session.user;
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        userId: userSession.id,
      },
      select: {
        gender: true,
      },
    });

    if (!profile || !profile.gender) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Gender must be set to find a match.",
      });
    }

    const userQueue: UserQueue = {
      userId: userSession.id,
      ...input,
      gender: profile.gender,
    };

    const matchResult = await findMatch(userQueue);

    if (!matchResult) {
      for (const otherSocket of await ctx.io
        .in(userSession.id)
        .fetchSockets()) {
        otherSocket.data.matchQueue = userQueue;
      }
      return;
    }

    const match = await ctx.prisma.userMatch.create({
      data: {
        firstUserId: matchResult.firstPair.userId,
        secondUserId: matchResult.secondPair.userId,
        topic: userQueue.topic,
        isRevealed: !userQueue.isAnonymous,
      },
    });

    for (const otherSocket of await ctx.io
      .in([match.firstUserId, match.secondUserId])
      .fetchSockets()) {
      otherSocket.data.match = match;
    }

    ctx.io.to([match.firstUserId, match.secondUserId]).emit("match", match);
  }
);

export const endMatchEvent = createEvent(
  {
    name: "endMatch",
    authRequired: true,
  },
  async ({ ctx }) => {
    const removeFromAskingRevealSet = async (userId: string) => {
      const redis = Redis.getClient();
      const isUserExist = await redis.sismember(askingRevealSet, userId);
      if (isUserExist) {
        await redis.srem(askingRevealSet, userId);
      }
    };
    const currentMatch = ctx.client.data.match;
    if (!currentMatch) return;

    const match = await ctx.prisma.userMatch.update({
      where: {
        id: currentMatch.id,
      },
      data: {
        endedAt: new Date(),
      },
    });

    for (const otherSocket of await ctx.io
      .in([match.firstUserId, match.secondUserId])
      .fetchSockets()) {
      otherSocket.data.match = null;
    }

    if (match.endedAt !== null) {
      await removeFromAskingRevealSet(match.firstUserId);
      await removeFromAskingRevealSet(match.secondUserId);
    }

    ctx.io.to([match.firstUserId, match.secondUserId]).emit("endMatch", match);
  }
);

export const cancelMatchEvent = createEvent(
  {
    name: "cancelMatch",
    authRequired: true,
    input: undefined,
  },
  async ({ ctx }) => {
    const queue = ctx.client.data.matchQueue;

    if (!queue) {
      // reject since not in queue
      return;
    }

    await cancelQueue(queue);
    for (const otherSocket of await ctx.io
      .in(ctx.client.data.session.user.id)
      .fetchSockets()) {
      otherSocket.data.matchQueue = null;
    }
  }
);

export const checkMatchEvent = createEvent(
  {
    name: "checkMatch",
    authRequired: true,
    input: undefined,
  },
  async ({ ctx }) => {
    const userRawQueue = await Redis.getClient().get(
      generateQueueKey(ctx.client.data.session.user.id)
    );

    const result: {
      queue: null | UserQueue;
      match: null | UserMatch;
    } = {
      queue: null,
      match: null,
    };

    if (userRawQueue) {
      result.queue = JSON.parse(userRawQueue) as UserQueue;
      return result;
    }

    if (!ctx.client.data.match) {
      const userId = ctx.client.data.session.user.id;
      ctx.client.data.match = await ctx.prisma.userMatch.findFirst({
        where: {
          OR: [{ firstUserId: userId }, { secondUserId: userId }],
          endedAt: null,
        },
      });
    }

    ctx.client.data.matchQueue = null;
    result.match = ctx.client.data.match;
    return result;
  }
);
