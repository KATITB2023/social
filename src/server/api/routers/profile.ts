import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { SelfProfile } from "~/server/types/user-profile";

export const profileRouter = createTRPCRouter({
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
