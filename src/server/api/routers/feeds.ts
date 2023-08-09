import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type Feed as extendFeed } from "~/server/types/feed";

export const feedRouter = createTRPCRouter({
  getFeeds: protectedProcedure
    .input(
      z.object({
        cursor: z.number().int().positive().default(1),
        limit: z.number().int().positive().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      // Query feeds
      const feeds = await ctx.prisma.feed.findMany({
        take: input.limit,
        skip: (input.cursor - 1) * input.limit,
        orderBy: {
          createdAt: "desc",
        },
      });

      const feedIds = feeds.map((feed) => feed.id);

      // Group feed reactions
      const groupedReactions = await ctx.prisma.feedReaction.groupBy({
        by: ["feedId", "reaction"],
        where: {
          feedId: {
            in: feedIds,
          },
        },
        _count: {
          userId: true,
        },
      });

      // Get user reactions
      const userReactions = await ctx.prisma.feedReaction.findMany({
        where: {
          feedId: {
            in: feedIds,
          },
          userId: ctx.session.user.id,
        },
        select: {
          feedId: true,
          reaction: true,
        },
      });

      // Check if user has read these feeds
      const userReadFeeds = await ctx.prisma.feedRead.findMany({
        where: {
          feedId: {
            in: feedIds,
          },
          userId: ctx.session.user.id,
        },
        select: {
          feedId: true,
        },
      });

      // Transform into reactions object
      const data = feeds.map((feed) => {
        const reactions: extendFeed["reactions"] = {};

        groupedReactions
          .filter((group) => group.feedId === feed.id)
          .forEach((group) => {
            reactions[group.reaction] = {
              count: group._count.userId,
              reacted:
                userReactions.some(
                  (userReaction) =>
                    userReaction.feedId === feed.id &&
                    userReaction.reaction === group.reaction
                ) || false,
            };
          });

        const read: extendFeed["read"] = userReadFeeds.some(
          (userReadFeed) => userReadFeed.feedId === feed.id
        );

        return {
          ...feed,
          reactions,
          read,
        };
      });

      return {
        data,
        nextCursor: data.length < input.limit ? undefined : input.cursor + 1,
      };
    }),
  getReactions : protectedProcedure
    .input(z.object({feedId : z.number().int()}))
    .query(async({ctx,input}) =>{
      const reactions = await ctx.prisma.feed.findMany({
        where:{
          
        }
      }) 
    }),
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
