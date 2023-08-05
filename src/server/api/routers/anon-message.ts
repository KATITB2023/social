import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type AnonChatHeader } from "~/server/types/message";

export const anonymousMessageRouter = createTRPCRouter({
  chatHeader: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(5).max(40).default(20),
        page: z.number().min(1).default(1),
      })
    )
    .query(async ({ ctx, input }): Promise<AnonChatHeader[]> => {
      const chatHeaders = await ctx.prisma.userMatch.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  firstUserId: ctx.session.user.id,
                },
                {
                  secondUserId: ctx.session.user.id,
                },
              ],
            },
            {
              endedAt: {
                not: null,
              },
            },
          ],
        },
        include: {
          firstUser: {
            select: {
              id: true,
              profile: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
          secondUser: {
            select: {
              id: true,
              profile: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: {
          endedAt: "desc",
        },
        skip: input.limit * (input.page - 1),
        take: input.limit,
      });

      return chatHeaders.map((chatHeader) => {
        const otherUser =
          chatHeader.firstUserId === ctx.session.user.id
            ? chatHeader.secondUser
            : chatHeader.firstUser;
        if (!otherUser.profile) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Other user profile not found",
          });
        }

        return {
          user: {
            id: otherUser.id,
            name: !chatHeader.isRevealed ? "Anonymous" : otherUser.profile.name,
            profileImage: !chatHeader.isRevealed
              ? null
              : otherUser.profile.image,
          },
        };
      });
    }),

  infinite: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            date: z.date(),
            id: z.string().uuid(),
          })
          .optional(),
        take: z.number().min(1).max(50).default(10),
        userMatchId: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const page = await ctx.prisma.message.findMany({
        orderBy: {
          createdAt: "desc",
        },
        cursor: input.cursor
          ? {
              createdAt_id: {
                createdAt: input.cursor.date,
                id: input.cursor.id,
              },
            }
          : undefined,
        take: input.take + 1,
        skip: 0,
        where: {
          userMatchId: input.userMatchId,
        },
      });

      const items = page.reverse();
      let prevCursor = undefined;

      if (items.length > input.take) {
        const prev = items.shift();

        if (prev) {
          prevCursor = {
            id: prev.id,
            date: prev.createdAt,
          };
        }
      }

      return {
        items,
        prevCursor,
      };
    }),
});
