import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateResetToken } from "~/utils/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  requestResetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profile.findUnique({
        where: {
          email: input.email,
        },
        select: {
          userId: true,
        },
      });

      if (!profile) {
        throw new TRPCError({
          message: "User not found",
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.resetToken.deleteMany({
        where: {
          userId: profile.userId,
        },
      });

      const { resetToken, hashedToken } = await generateResetToken();

      await ctx.prisma.resetToken.create({
        data: {
          token: hashedToken,
          userId: profile.userId,
        },
      });

      return `https://BASE_URL/reset-password/${profile.userId}/${resetToken}`;
    }),
});
