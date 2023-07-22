import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const profileRouter = createTRPCRouter({
  editProfile: protectedProcedure
    .input(
      z.object({
        email: z.string().optional(),
        image: z.string().optional(),
        bio: z.string().optional(),
        instagram: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.profile.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          email: input.email,
          image: input.image,
          bio: input.bio,
          instagram: input.instagram,
        },
      });
      return {
        message: "Edit succesful",
      };
    }),
});
