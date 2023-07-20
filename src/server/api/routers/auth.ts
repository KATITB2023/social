import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateResetToken } from "~/utils/auth";

export const authRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello world";
  }),

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
        throw new Error("User not found");
      }

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: profile.userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const deleteToken = await ctx.prisma.resetToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      const { resetToken, hashedToken } = await generateResetToken();

      const newResetToken = await ctx.prisma.resetToken.create({
        data: {
          token: hashedToken,
          userId: user.id,
        },
      });

      return `https://BASE_URL/reset-password/${user.id}/${resetToken}`;
    }),
});
