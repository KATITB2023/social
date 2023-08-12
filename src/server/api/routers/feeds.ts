import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
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
  react: protectedProcedure
    .input(
      z.object({
        feedId: z.number().int(),
        reaction: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Mencari apakah user pernah memberikan reaction yang sama di sebuah feed
      const reaction = await ctx.prisma.feedReaction.findUnique({
        where: {
          feedId_userId_reaction: {
            feedId: input.feedId,
            userId: ctx.session.user.id,
            reaction: input.reaction,
          },
        },
      });
      // Kalau belum pernah ada reaction, tambahkan reaction baru
      if (!reaction) {
        await ctx.prisma.feedReaction.create({
          data: {
            reaction: input.reaction,
            feedId: input.feedId,
            userId: ctx.session.user.id,
          },
        });
        return true;
      } else {
        // Kalau sudah pernah ada reaction yang sama
        await ctx.prisma.feedReaction.delete({
          where: {
            feedId_userId_reaction: {
              feedId: input.feedId,
              userId: ctx.session.user.id,
              reaction: input.reaction,
            },
          },
        });
        return false;
      }
    }),
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
