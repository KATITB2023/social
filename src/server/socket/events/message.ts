import { z } from "zod";
import { createEvent } from "../helper";
import { currentlyTyping } from "../state";

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
    const message = await ctx.prisma.message.create({
      data: {
        senderId: ctx.client.data.session.user.id,
        receiverId: input.receiverId,
        message: input.message,
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

export const isTypingEvent = createEvent(
  {
    name: "isTyping",
    input: z.object({ typing: z.boolean(), receiverId: z.string().uuid() }),
    authRequired: true,
  },
  ({ ctx, input }) => {
    if (!input.typing) {
      delete currentlyTyping[ctx.client.data.session.user.id];
    } else {
      currentlyTyping[ctx.client.data.session.user.id] = {
        lastTyped: new Date(),
      };
    }

    ctx.io
      .to([input.receiverId])
      .emit("whoIsTyping", Object.keys(currentlyTyping));
  }
);
