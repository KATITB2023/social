import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { SelfProfile } from "~/server/types/user-profile";
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
  hello: publicProcedure.query(() => {
    return "hello world";
  }),

  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const sessionUser = ctx.session.user;

    const currUser = await ctx.prisma.user.findUnique({
      select: {
        profile: true,
        nim: true,
        id: true,
      },
      where: {
        nim: sessionUser.nim,
      },
    });

    if (currUser?.profile) {
      const { userId, updatedAt, ...profileDetails } = currUser.profile;
      return {
        id: currUser.id,
        nim: currUser.nim,
        ...profileDetails,
      } as SelfProfile;
    }
  }),
});
