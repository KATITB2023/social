import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const friendRouter = createTRPCRouter({
  searchUsers: protectedProcedure
    .input(
      z.object({
        q: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              profile: {
                name: {
                  contains: input.q || "",
                  mode: "insensitive",
                },
              },
            },
            {
              nim: {
                startsWith: input.q || "",
              },
            },
          ],
        },
        select: {
          profile: true,
        },
      });
      const profiles = users.map((user) => user.profile);
      return profiles;
    }),
  removeFriend: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const friendship = await ctx.prisma.friendship.findFirst({
        where: {
          OR: [
            {
              userInitiatorId: ctx.session.user.id,
              userReceiverId: input.userId,
            },
            {
              userReceiverId: ctx.session.user.id,
              userInitiatorId: input.userId,
            },
          ],
        },
      });

      if (friendship !== null) {
        if (friendship.accepted) {
          await ctx.prisma.profile.updateMany({
            where: {
              userId: {
                in: [ctx.session.user.id, input.userId],
              },
            },
            data: {
              friendCount: {
                decrement: 1,
              },
            },
          });
        }

        await ctx.prisma.friendship.delete({
          where: {
            userInitiatorId_userReceiverId: {
              userReceiverId: friendship.userReceiverId,
              userInitiatorId: friendship.userInitiatorId,
            },
          },
        });

        return true;
      }

      throw new TRPCError({
        message: "User is not a friend or in request for friendship",
        code: "BAD_REQUEST",
      });
    }),
});
