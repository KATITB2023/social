import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type ChatHeader } from "~/server/types/message";

export const messageRouter = createTRPCRouter({
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
        pairId: z.string().uuid(),
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
          OR: [
            {
              AND: {
                receiverId: input.pairId,
                senderId: ctx.session.user.id,
              },
            },
            {
              AND: {
                receiverId: ctx.session.user.id,
                senderId: input.pairId,
              },
            },
          ],
          userMatchId: null,
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
  getUser: protectedProcedure
    .input(
      z.object({
        pairId: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirstOrThrow({
        where: {
          id: input.pairId,
        },
        select: {
          nim: true,
          id: true,
        },
      });
    }),
  availableUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: {
        id: {
          not: ctx.session !== null ? ctx.session.user.id : undefined,
        },
      },
      select: {
        id: true,
        nim: true,
      },
    });
  }),
  chatHeader: protectedProcedure.query(
    // delete me after implementation
    // eslint-disable-next-line @typescript-eslint/require-await
    async ({ ctx }): Promise<ChatHeader[]> => {
      return [];
    }
  ),
  reportUser: protectedProcedure
    .input(
      // Menerima input berupa uuid pengguna
      z.object({
        userId: z.string().uuid(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Mencari pengguna yang dilaporkan
      const reportedUser = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      // Jika salah satunya tidak ada, throw Error
      if (!reportedUser) {
        throw new TRPCError({
          message: "User not found",
          code: "BAD_REQUEST",
        });
      }

      // Memastikan keduanya sedang berpasangan
      const matched = await ctx.prisma.userMatch.findFirst({
        where: {
          OR: [
            {
              firstUserId: reportedUser.id,
              secondUserId: ctx.session?.user.id,
              endedAt: null,
            },
            {
              firstUserId: ctx.session?.user.id,
              secondUserId: reportedUser.id,
              endedAt: null,
            },
          ],
        },
      });
      // Kalau ternyata tidak matched, berarti gabisa direport
      if (!matched) {
        throw new TRPCError({
          message: "You are not a matched!",
          code: "BAD_REQUEST",
        });
      }
      const matchId = matched.id;

      // Mencari apakah sudah pernah direport di session yang sama
      const hasReported = await ctx.prisma.chatReport.findFirst({
        where: {
          userMatchId: matchId,
        },
      });

      // Kalau misalnya belum, masukan ke dalam database
      if (!hasReported) {
        await ctx.prisma.chatReport.create({
          data: {
            reportedUserId: reportedUser.id,
            userMatchId: matched.id,
            message: input.message,
          },
        });
      }
      // Kalau misalnya sudah, jangan dimasukkan
      else {
        throw new TRPCError({
          message: "Your report has been submitted before!",
          code: "BAD_REQUEST",
        });
      }
    }),
  updateIsRead: protectedProcedure
    .input(
      // Menerima input berupa id pengirim dan id penerima
      z.object({
        senderId: z.string().uuid(),
        receiverId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const whereCondition = {
        AND: [
          {
            receiverId: input.receiverId,
          },
          {
            senderId: input.senderId,
          },
          {
            userMatchId: null,
          },
          {
            isRead: false,
          },
        ],
      };
      const message = await ctx.prisma.message.findFirst({
        where: whereCondition,
      });

      if (!message) {
        throw new TRPCError({
          message: "Message not found",
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.message.updateMany({
        where: whereCondition,
        data: {
          isRead: true,
        },
      });
    }),
  updateIsReadByMatchId: protectedProcedure
    .input(
      z.object({
        userMatchId: z.string().uuid(),
        receiverId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const whereCondition = {
        AND: [
          {
            receiverId: input.receiverId,
          },
          {
            userMatchId: input.userMatchId,
          },
          {
            isRead: false,
          },
        ],
      };

      const message = await ctx.prisma.message.findFirst({
        where: whereCondition,
      });

      if (!message) {
        throw new TRPCError({
          message: "Message not found",
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.message.updateMany({
        where: whereCondition,
        data: {
          isRead: true,
        },
      });
    }),
  updateOneIsRead: protectedProcedure
    .input(
      z.object({
        messageId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const whereCondition = {
        id: input.messageId,
        isRead: false,
      };
      const message = await ctx.prisma.message.findFirst({
        where: whereCondition,
      });

      if (!message) {
        throw new TRPCError({
          message: "Message not found",
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.message.updateMany({
        where: whereCondition,
        data: {
          isRead: true,
        },
      });
    }),
});
