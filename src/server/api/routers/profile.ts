import { type Profile } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  studentProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
/* Status pertemanan
 * REQUESTING_FRIENDSHIP: ketika user A (yang login saat ini) mengirim permintaan pertemanan kepada B, tetapi belum diterima
 * WAITING_FOR_ACCEPTANCE: ketika user B mengirim permintaan kepada user A (yang login saat ini), tetapi belum diterima
 * */
export type FRIENDSHIP_STATUS =
  | "NOT_FRIEND"
  | "FRIEND"
  | "REQUESTING_FRIENDSHIP"
  | "WAITING_FOR_ACCEPTANCE";

export type SelfProfile = {
  id: string;
  nim: string;
} & Omit<Profile, "updatedAt" | "userId">;

export type UserProfile = SelfProfile & {
  status: FRIENDSHIP_STATUS;
};

export const profileRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello world";
  }),
  editProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        name: z.string().optional(),
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
          name: input.name,
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
