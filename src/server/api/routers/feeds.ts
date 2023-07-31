import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { boolean, z } from "zod";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { Feed as extendFeed } from "~/server/types/feed";

export const feedRouter = createTRPCRouter({
  getFeeds: protectedProcedure
    .input(
      z.object({
        page : z.number().int().positive().default(1),
        limit : z.number().int().positive().default(10),
      })
    )

    .query(async ({ ctx, input }) => {

      // Query feeds
      const feeds = await ctx.prisma.feed.findMany({
        take: input.limit,
        skip: (input.page - 1) * input.limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          imageUrl: true,
          createdAt: true,
        },
      });

      // Iterate over every feed
      const feedList = await Promise.all(feeds.map(async (feed) => {

        // Group feed reactions
        const groupedReactions = await ctx.prisma.feedReaction.groupBy({
          by: ["reaction"],
          where: {
            feedId: feed.id,
          },
          _count: {
            reaction: true,
          },  
        });

        // Check if user has reacted to this feed
        const userReaction = await ctx.prisma.feedReaction.findFirst({
          where: {
            feedId: feed.id,
            userId: ctx.session.user.id,
          },
          select: {
            reaction: true,
          },
        });

        // Transform groupedReactions and userReaction into reactions object
        const reactions: extendFeed["reactions"] = {};      
        groupedReactions.forEach((group) => {
          reactions[group.reaction] = {
            count: group._count.reaction,
            reacted: userReaction?.reaction === group.reaction || false,
          };
        }); 

        // Check if user has read this feed
        let read: extendFeed["read"];
        const isRead = await ctx.prisma.feedRead.findFirst({
          where: {
            feedId: feed.id,
            userId: ctx.session.user.id,
          },
        });

        if (isRead) {
          read = true; 
        } else {
          read = false;
        }


        return { 
          ...feed, 
          reactions,
          read,
        };
    }));

    return feedList

    }),
  react: protectedProcedure.mutation(() => "hello"),
});
