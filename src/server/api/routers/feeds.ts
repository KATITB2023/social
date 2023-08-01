import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const feedRouter = createTRPCRouter({
  getFeeds: protectedProcedure.query(() => "hello"),
  react: protectedProcedure.mutation(() => "hello"),
  readFeed: protectedProcedure
    .input(z.object({ feedId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.feedRead.upsert({
        where: {
          userId_feedId: {
            userId: ctx.session.user.id,
            feedId: input.feedId,
          },
        },
        create: {
          userId: ctx.session.user.id,
          feedId: input.feedId,
        },
        update: {},
      });
    }),
});
