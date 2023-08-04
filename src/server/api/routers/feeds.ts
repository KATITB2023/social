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
    
      const feedIds = feeds.map(feed => feed.id);
    
      // Group feed reactions
      const groupedReactions = await ctx.prisma.feedReaction.groupBy({
        by: ["feedId", "reaction"],
        where: {
          feedId: {
            in: feedIds
          }
        },
        _count: {
          reaction: true,
        },
      });
    
      // Get user reactions
      const userReactions = await ctx.prisma.feedReaction.findMany({
        where: {
          feedId: {
            in: feedIds
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
            in: feedIds
          },
          userId: ctx.session.user.id,
        },
        select: {
          feedId: true
        }
      });
    
      // Transform into reactions object
      const feedList = feeds.map(feed => {
  
        const reactions: extendFeed["reactions"] = {};
        
        groupedReactions.filter(group => group.feedId === feed.id).forEach(group => {
  
          reactions[group.reaction] = {
            count: group._count.reaction,
            reacted: userReactions.some(userReaction => userReaction.feedId === feed.id && userReaction.reaction === group.reaction) || false,
          };
          
        });
    
        let read: extendFeed["read"] = userReadFeeds.some(userReadFeed => userReadFeed.feedId === feed.id);
    
        return {
          ...feed,
          reactions,
          read,
        };
      });
    
      return feedList;
    }),
  react: protectedProcedure.mutation(() => "hello"),
});
