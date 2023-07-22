import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getFriendStatus } from "~/utils/friend";
import {
  type SelfProfile,
  type UserProfile,
} from "~/server/types/user-profile";
import { type FRIENDSHIP_STATUS } from "~/server/types/friendship";

const ACCEPTED_FRIENDSHIP_STATUS = [
  "FRIEND",
  "REQUESTING_FRIENDSHIP",
  "WAITING_FOR_ACCEPTANCE",
] as const;

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
  addFriend: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      const userExists = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      // Validate input.userId
      if (!userExists) {
        throw new TRPCError({
          message: "User not found",
          code: "BAD_REQUEST",
        });
      }

      const friendship = await ctx.prisma.friendship.findFirst({
        where: {
          OR: [
            {
              userInitiatorId: ctx.session.user.id,
              userReceiverId: input.userId,
            },
            {
              userInitiatorId: input.userId,
              userReceiverId: ctx.session.user.id,
            },
          ],
        },
      });

      if (friendship !== null) {
        if (!friendship.accepted) {
          if (friendship.userInitiatorId === input.userId) {
            // accept invitation

            // update friend count
            await ctx.prisma.profile.updateMany({
              where: {
                userId: {
                  in: [ctx.session.user.id, input.userId],
                },
              },
              data: {
                friendCount: {
                  increment: 1,
                },
              },
            });

            // update friendship status
            await ctx.prisma.friendship.update({
              where: {
                userInitiatorId_userReceiverId: {
                  userReceiverId: friendship.userReceiverId,
                  userInitiatorId: friendship.userInitiatorId,
                },
              },
              data: {
                accepted: true,
              },
            });
          } else if (friendship.userInitiatorId === ctx.session.user.id) {
            // ERROR : invitation already sent
            throw new TRPCError({
              message: "Invitation already sent",
              code: "BAD_REQUEST",
            });
          }
        } else {
          // ERROR : user is already a friend
          throw new TRPCError({
            message: "User is already a friend",
            code: "BAD_REQUEST",
          });
        }
      } else {
        // not found -> create new frindship

        await ctx.prisma.friendship.create({
          data: {
            userInitiatorId: ctx.session.user.id,
            userReceiverId: input.userId,
            accepted: false,
          },
        });
      }
    }),
  friendList: protectedProcedure
    .input(
      z
        .object({
          status: z.enum(ACCEPTED_FRIENDSHIP_STATUS),
          limit: z.number().min(5).max(40).default(20),
          page: z.number().min(1).default(1),
        })
        .refine((data) => ACCEPTED_FRIENDSHIP_STATUS.includes(data.status), {
          message: "Status must be one of the accepted friendship statuses",
        })
    )
    .query(async ({ ctx, input }): Promise<UserProfile[]> => {
      const currUser = ctx.session.user;
      const userId = currUser.id;

      let whereCondition;
      if (input.status === "FRIEND") {
        whereCondition = { accepted: true };
      } else if (input.status === "REQUESTING_FRIENDSHIP") {
        whereCondition = { accepted: false, userInitiatorId: userId };
      } else if (input.status === "WAITING_FOR_ACCEPTANCE") {
        whereCondition = { accepted: false, userReceiverId: userId };
      } else {
        whereCondition = {};
      }

      const friendships = await ctx.prisma.friendship.findMany({
        where: {
          ...whereCondition,
          OR: [{ userInitiatorId: userId }, { userReceiverId: userId }],
        },
        skip: input.limit * (input.page - 1),
        take: input.limit,
      });

      const friendIds = friendships.map((friendship) => {
        if (friendship.userInitiatorId === userId) {
          return friendship.userReceiverId;
        }
        return friendship.userInitiatorId;
      });

      const friendProfiles = await ctx.prisma.profile.findMany({
        where: {
          userId: { in: friendIds },
        },
        include: {
          user: true,
        },
      });

      return friendProfiles.map((profile) => {
        const { updatedAt, userId, ...rest } = profile;
        return {
          ...rest,
          id: profile.user.id,
          nim: profile.user.nim,
          status: input.status,
        };
      });
    }),

  getOtherUserProfile: protectedProcedure
    .input(
      z
        .object({
          pin: z.string().optional(),
          nim: z.string().optional(),
          userId: z.string().optional(),
        })
        .and(
          z.union(
            [
              z.object({
                pin: z.string(),
                nim: z.undefined(),
                userId: z.undefined(),
              }),
              z.object({
                pin: z.undefined(),
                nim: z.string(),
                userId: z.undefined(),
              }),
              z.object({
                pin: z.undefined(),
                nim: z.undefined(),
                userId: z.string(),
              }),
            ],
            {}
          )
        )
    )
    .query(async ({ ctx, input }) => {
      if (
        (input.userId && ctx.session.user.id === input.userId) ||
        (input.nim && ctx.session.user.nim === input.nim)
      ) {
        // request user's own profile
        throw new TRPCError({
          message: "Cannot request user's own profile",
          code: "BAD_REQUEST",
        });
      }

      if (input.pin || input.userId || input.nim) {
        const profile = await ctx.prisma.profile.findFirst({
          where: {
            OR: [
              {
                userId: input.userId,
              },
              {
                pin: input.pin,
              },
              {
                user: {
                  nim: input.nim,
                },
              },
            ],
          },
          include: {
            user: true,
          },
        });

        // user is not found
        if (!profile) {
          throw new TRPCError({
            message: "Profile not found",
            code: "BAD_REQUEST",
          });
        }

        // user is found
        const friendship = await ctx.prisma.friendship.findFirst({
          where: {
            OR: [
              {
                userInitiatorId: ctx.session.user.id,
                userReceiverId: profile.userId,
              },
              {
                userReceiverId: ctx.session.user.id,
                userInitiatorId: profile.userId,
              },
            ],
          },
        });

        return {
          ...profile,
          id: profile.userId,
          nim: profile.user.nim,
          status: friendship
            ? friendship.accepted
              ? "FRIEND"
              : friendship.userInitiatorId === ctx.session.user.id
              ? "REQUESTING_FRIENDSHIP"
              : "WAITING_FOR_ACCEPTANCE"
            : "NOT_FRIEND",
        };
      }
    }),

  incrementVisitCounter: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
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
