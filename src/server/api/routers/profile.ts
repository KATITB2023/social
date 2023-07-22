import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello world";
  }),
  editProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        email: z.string().optional(),
        image: z.string().optional(),
        bio: z.string().optional(),
        instagram: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.profile.update({
        where: {
          userId: input.userId,
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
