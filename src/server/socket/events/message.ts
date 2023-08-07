import { z } from "zod";
import { createEvent } from "../helper";
import { currentlyTyping, askingReveal } from "../state";
import { type RoomChat } from "@prisma/client";

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

    delete currentlyTyping[ctx.client.data.session.user.id];
    ctx.io
      .to(message.receiverId)
      .emit("whoIsTyping", Object.keys(currentlyTyping));

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

const modifyCurrentlyTyping = (isTyping: boolean, userId: string) => {
  if (!isTyping) {
    delete currentlyTyping[userId];
  } else {
    currentlyTyping[userId] = {
      lastTyped: new Date(),
    };
  }
};

export const isTypingEvent = createEvent(
  {
    name: "isTyping",
    input: z.object({ typing: z.boolean(), receiverId: z.string().uuid() }),
    authRequired: true,
  },
  ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    modifyCurrentlyTyping(input.typing, user.id);

    ctx.io
      .to([input.receiverId])
      .emit("whoIsTyping", Object.keys(currentlyTyping));
  }
);

export const anonTypingEvent = createEvent(
  {
    name: "anonTyping",
    input: z.object({ typing: z.boolean() }),
    authRequired: true,
  },
  ({ ctx, input }) => {
    const user = ctx.client.data.session.user;
    const match = ctx.client.data.match;

    if (match === null) return;

    const receiverId =
      match.firstUserId === user.id ? match.secondUserId : match.firstUserId;
    modifyCurrentlyTyping(input.typing, user.id);

    ctx.io.to([receiverId]).emit("anonIsTyping", Object.keys(currentlyTyping));
  }
);

export const askRevealEvent = createEvent(
  {
    name: "askReveal",
    input: z.object({ agree: z.boolean() }),
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

    if (askingReveal.has(receiverId)) {
      if (input.agree) {
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
          .emit("askReveal", match, "Revealed wow!");
      } else {
        ctx.io
          .to([userId])
          .emit("askReveal", currentMatch, "Yowes kalo gamau reveal");
        ctx.io
          .to([receiverId])
          .emit("askReveal", currentMatch, "Si doi gamau reveal nih, NT bos!");
      }

      askingReveal.delete(receiverId);
    } else {
      // masukin ke set
      askingReveal.add(userId);
      // ask lawan to reveal
      ctx.io
        .to([userId])
        .emit(
          "askReveal",
          currentMatch,
          "Berhasil request teman untuk reveal profil!"
        );
      ctx.io.to([receiverId]).emit("askReveal", currentMatch, "");
    }
  }
);
