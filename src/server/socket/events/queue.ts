import { createEvent } from "~/server/socket/helper";
import { z } from "zod";
import { cancelQueue, findMatch } from "~/server/socket/messaging/queue";

export const findMatchEvent = createEvent(
  {
    name: "findMatch",
    input: z.object({
      baka: z.string().default("bakabaka"),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    if (ctx.client.data.matchQueue !== null) {
      // reject since already in queue
      return;
    }

    const userSession = ctx.client.data.session.user;
    const userQueue = {
      userId: userSession.id,
    };

    const matchResult = await findMatch(userQueue);

    if (matchResult === null) {
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
    const currentMatch = ctx.client.data.match;

    if (currentMatch === null) return;

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

    ctx.io.to([match.firstUserId, match.secondUserId]).emit("endMatch", match);
  }
);

export const cancelMatchEvent = createEvent(
  {
    name: "cancelMatch",
    authRequired: true,
  },
  async ({ ctx }) => {
    const queue = ctx.client.data.matchQueue;

    if (queue === null) {
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
  },
  async ({ ctx }) => {
    if (ctx.client.data.match === null) {
      const userId = ctx.client.data.session.user.id;
      const userMatch = await ctx.prisma.userMatch.findFirst({
        where: {
          OR: [{ firstUserId: userId }, { secondUserId: userId }],
          endedAt: null,
        },
      });

      if (userMatch === null) {
        return null;
      } else {
        ctx.client.data.match = userMatch;
        return userMatch;
      }
    }

    return ctx.client.data.match;
  }
);
