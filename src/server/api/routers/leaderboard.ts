import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { string, z } from "zod";
import { Leaderboard } from "~/server/types/leaderboard";

export const leaderboardRouter = createTRPCRouter({
  getLeaderboard: publicProcedure
    .input(
      z.object({
        page: z.number().int().default(1),
        limit: z.number().int().default(20),
      })
    )
    .query(async ({ ctx, input }): Promise<Leaderboard[]> => {
      const profileData = await ctx.prisma.profile.findMany({
        orderBy: [{ point: "desc" }],
        take: input.limit,
        skip: (input.page - 1) * input.limit,
        select: {
          userId: true,
          name: true,
          image: true,
          point: true,
        },
      });

      let leaderboardData: Leaderboard[] = [];
      let currentRank = (input.page - 1) * input.limit + 1;
      let totalSamePoint = 0;
      let stillSame = false;

      for (const profile of profileData) {
        // Cek poin sama/tidak dengan point user sebelumnya
        if (
          leaderboardData[0] &&
          leaderboardData[
            currentRank - (input.page - 1) * input.limit + totalSamePoint - 2
          ]?.point == profile.point
        ) {
          currentRank--;
          totalSamePoint++;
          stillSame = true;
        } else {
          stillSame = false;
        }

        // Kondisi saat poin sudah tidak sama dan jumlah user dengan poin sama lebih dari 0
        if (!stillSame && totalSamePoint) {
          currentRank = currentRank + totalSamePoint;
          totalSamePoint = 0;
        }

        leaderboardData.push({
          userId: profile.userId,
          name: profile.name,
          profileImage: profile.image,
          point: profile.point,
          rank: currentRank,
        });
        currentRank++;
      }
      return leaderboardData;
    }),

  userPosition: protectedProcedure.query((): Leaderboard => {
    return {} as Leaderboard;
  }),
});
