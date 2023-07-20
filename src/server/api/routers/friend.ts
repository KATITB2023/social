import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const friendRouter = createTRPCRouter({
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
          code: "NOT_FOUND",
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
            await ctx.prisma.friendship.updateMany({
              where: {
                userInitiatorId: {
                  in: [input.userId],
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
});
