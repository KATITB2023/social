import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getFriendStatus } from "~/utils/friend";
import { type SelfProfile } from "~/server/types/user-profile";
import { type FRIENDSHIP_STATUS } from "~/server/types/friendship";

export const friendRouter = createTRPCRouter({
  searchUsers: protectedProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const currUser = ctx.session.user;
      const users = await ctx.prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  profile: {
                    name: {
                      contains: input.query,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  nim: {
                    startsWith: input.query,
                  },
                },
              ],
            },
            {
              id: {
                not: currUser.id,
              },
            },
          ],
        },
        select: {
          profile: true,
          nim: true,
          id: true,
        },
        take: 10,
      });

      const selfProfiles = users
        .map((user) => {
          if (user.profile) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { userId, updatedAt, ...profileDetails } = user.profile;
            return {
              id: user.id,
              nim: user.nim,
              ...profileDetails,
            };
          }
        })
        .filter((x): x is SelfProfile => x !== null && x !== undefined); // wont be returned if user profile is undefined

      const friendships = await ctx.prisma.friendship.findMany({
        where: {
          OR: [
            {
              userInitiatorId: currUser.id,
              userReceiverId: {
                in: users.map((user) => user.id),
              },
            },
            {
              userInitiatorId: {
                in: users.map((user) => user.id),
              },
              userReceiverId: currUser.id,
            },
          ],
        },
      });

      const friendStatus = getFriendStatus(friendships, currUser.id);

      const userProfiles = selfProfiles.map((profile) => {
        if (profile) {
          const status: FRIENDSHIP_STATUS =
            friendStatus[profile.id] || "NOT_FRIEND";
          return {
            ...profile,
            status,
          };
        }
      });

      return userProfiles;
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

  incrementVisitCounter: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.profile.update({
          where: {
            userId: input.userId,
          },
          data: {
            visitedCount: {
              increment: 1,
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          message: "Target Profile not found",
          code: "BAD_REQUEST",
        });
      }

      return true;
    }),
});
