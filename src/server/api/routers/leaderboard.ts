import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { type Leaderboard } from "~/server/types/leaderboard";
import { TRPCError } from "@trpc/server";

export const leaderboardRouter = createTRPCRouter({
  getLeaderboard: publicProcedure
    .input(
      z.object({
        cursor: z.number().int().default(1),
        limit: z.number().int().default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const profileData = await ctx.prisma.profile.findMany({
        orderBy: [{ point: "desc" }],
        take: input.limit,
        skip: (input.cursor - 1) * input.limit,
        include: {
          user: true,
        },
      });

      const leaderboardData: Leaderboard[] = [];
      let currentRank = (input.cursor - 1) * input.limit + 1;
      let totalSamePoint = 0;
      let stillSame = false;

      const totalCount = await ctx.prisma.profile.aggregate({
        _count: { userId: true },
      });

      for (const profile of profileData) {
        // Cek poin sama/tidak dengan point user sebelumnya
        if (
          leaderboardData[0] &&
          leaderboardData[
            currentRank - (input.cursor - 1) * input.limit + totalSamePoint - 2
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
          nim: profile.user.nim,
        });
        currentRank++;
      }

      return {
        data: leaderboardData,
        nextCursor:
          leaderboardData.length < input.limit ? undefined : input.cursor + 1,
        totalPage: Math.ceil(totalCount._count.userId / input.limit),
      };
    }),
  getSelfLeaderboard: protectedProcedure.query(
    async ({ ctx }): Promise<Leaderboard> => {
      const result = await ctx.prisma.$queryRaw<
        { userId: string; point: number; position: number }[]
      >`WITH ranking AS (
                                                  SELECT "userId", point,
                                                         row_number() over (ORDER BY point desc, name ) position
                                                  FROM "Profile"
                                              )
                                              SELECT * FROM ranking WHERE "userId" = uuid(${ctx.session.user.id})`;

      const selfPos = result[0];

      if (!selfPos) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Self position not found",
        });
      }

      const user = await ctx.prisma.profile.findFirstOrThrow({
        where: { userId: ctx.session.user.id },
        include: { user: true },
      });

      return {
        userId: user.userId,
        name: user.name,
        profileImage: user.image,
        point: user.point,
        rank: selfPos.position,
        nim: user.user.nim,
      };
    }
  ),
});
