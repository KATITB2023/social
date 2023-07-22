import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type SelfProfile } from "~/server/types/user-profile";
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
  getUserProfile: protectedProcedure.query(
    async ({ ctx }): Promise<SelfProfile> => {
      const sessionUser = ctx.session.user;

      const currProfile = await ctx.prisma.profile.findUniqueOrThrow({
        include: {
          user: true,
        },
        where: {
          userId: sessionUser.id,
        },
      });

      const { userId, updatedAt, ...profileDetails } = currProfile;
      return {
        id: currProfile.user.id,
        nim: currProfile.user.nim,
        ...profileDetails,
      };
    }
  ),
});
