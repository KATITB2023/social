import { createEvent } from "~/server/socket/helper";
import { z } from "zod";
import { findMatch } from "~/server/socket/messaging/queue";
import { getUserSockets } from "~/server/socket/messaging/room";

export const findMatchEvent = createEvent(
  {
    name: "findMatch",
    input: z.object({
      baka: z.string().default("bakabaka"),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    const userSession = ctx.client.data.session.user;
    const matchResult = await findMatch({
      userId: userSession.id,
    });

    if (matchResult === null) {
      return;
    }

    const match = await ctx.prisma.userMatch.create({
      data: {
        firstUserId: matchResult.firstPair.userId,
        secondUserId: matchResult.secondPair.userId,
      },
    });

    ctx.client.data.match = match;
    ctx.client.emit("match", match);

    const receiverSockets = await getUserSockets(
      match.firstUserId === userSession.id
        ? match.secondUserId
        : match.firstUserId
    );

    if (receiverSockets.length !== 0) {
      ctx.io.to(receiverSockets).emit("match", match);
      for (const otherSocket of await ctx.io
        .in(receiverSockets)
        .fetchSockets()) {
        otherSocket.data.match = match;
      }
    }
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

    const endedMatch = await ctx.prisma.userMatch.update({
      where: {
        id: currentMatch.id,
      },
      data: {
        endedAt: new Date(),
      },
    });

    ctx.client.emit("endMatch", endedMatch);
    ctx.client.data.match = null;

    const receiverSockets = await getUserSockets(
      endedMatch.firstUserId === ctx.client.data.session.user.id
        ? endedMatch.secondUserId
        : endedMatch.firstUserId
    );

    if (receiverSockets.length !== 0) {
      ctx.io.to(receiverSockets).emit("match", endedMatch);
      for (const otherSocket of await ctx.io
        .in(receiverSockets)
        .fetchSockets()) {
        otherSocket.data.match = null;
      }
    }
  }
);
