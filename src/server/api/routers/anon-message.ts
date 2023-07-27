import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type ChatHeader } from "~/server/types/message";

export const anonymousMessageRouter = createTRPCRouter({
  chatHeader: protectedProcedure.query(
    // delete me after implementation
    // eslint-disable-next-line @typescript-eslint/require-await
    async ({ ctx }): Promise<ChatHeader[]> => {
      return [];
    }
  ),

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
