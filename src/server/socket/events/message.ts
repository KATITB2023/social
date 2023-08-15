import { z } from "zod";
import { createEvent } from "../helper";
import { type RoomChat } from "@prisma/client";
import { AskRevealStatus } from "~/server/types/message";

export const messageEvent = createEvent(
  {
    name: "message",
    input: z.object({
      message: z.string().min(1),
      receiverId: z.string().uuid(),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    let roomChat: RoomChat;

    const roomChatFromSession = ctx.client.data.roomChat.get(input.receiverId);

    if (!roomChatFromSession) {
      const roomFromDb = await ctx.prisma.roomChat.findFirst({
        where: {
          OR: [
            {
              firstUserId: input.receiverId,
              secondUserId: ctx.client.data.session.user.id,
            },
            {
              secondUserId: input.receiverId,
              firstUserId: ctx.client.data.session.user.id,
            },
          ],
        },
      });

      if (roomFromDb !== null) {
        roomChat = roomFromDb;
      } else {
        roomChat = await ctx.prisma.roomChat.create({
          data: {
            secondUserId: input.receiverId,
            firstUserId: ctx.client.data.session.user.id,
          },
        });
      }
    } else {
      roomChat = roomChatFromSession;
    }

    const message = await ctx.prisma.message.create({
      data: {
        senderId: ctx.client.data.session.user.id,
        receiverId: input.receiverId,
        message: input.message,
        roomChatId: roomChat.id,
      },
    });

    ctx.io.to([message.senderId, message.receiverId]).emit("add", message);

    return message;
  }
);

export const anonymousMessageEvent = createEvent(
  {
    name: "anonymousMessage",
    input: z.object({
      message: z.string().min(1),
    }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    const match = ctx.client.data.match;

    if (match === null) return;

    const receiverId =
      match.firstUserId === user.id ? match.secondUserId : match.firstUserId;

    const message = await ctx.prisma.message.create({
      data: {
        senderId: ctx.client.data.session.user.id,
        receiverId,
        message: input.message,
        userMatchId: match.id,
      },
    });

    ctx.io.to([match.firstUserId, match.secondUserId]).emit("add", message);

    return message;
  }
);

export const isTypingEvent = createEvent(
  {
    name: "isTyping",
    input: z.object({ receiverId: z.string().uuid() }),
    authRequired: true,
  },
  ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    ctx.io.to([input.receiverId]).emit("whoIsTyping", user.id);
  }
);

export const anonTypingEvent = createEvent(
  {
    name: "anonTyping",
    authRequired: true,
  },
  ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    const match = ctx.client.data.match;

    if (match === null) return;

    const receiverId =
      match.firstUserId === user.id ? match.secondUserId : match.firstUserId;

    ctx.io.to([receiverId]).emit("anonIsTyping", user.id);
  }
);

export const askRevealEvent = createEvent(
  {
    name: "askReveal",
    input: z.object({ state: z.nativeEnum(AskRevealStatus) }),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    const userId = user.id;
    const currentMatch = ctx.client.data.match;

    if (currentMatch === null) return;

    const receiverId =
      currentMatch.firstUserId === userId
        ? currentMatch.secondUserId
        : currentMatch.firstUserId;

    if (input.state === AskRevealStatus.ASK) {
      ctx.io
        .to([receiverId])
        .emit("askReveal", currentMatch, AskRevealStatus.ASK);
    } else if (input.state === AskRevealStatus.ACCEPTED) {
      const match = await ctx.prisma.userMatch.update({
        where: {
          id: currentMatch.id,
        },
        data: {
          isRevealed: true,
        },
      });

      ctx.io
        .to([userId, receiverId])
        .emit("askReveal", match, AskRevealStatus.ACCEPTED);
    } else {
      ctx.io
        .to([receiverId])
        .emit("askReveal", currentMatch, AskRevealStatus.REJECTED);
    }
  }
);
