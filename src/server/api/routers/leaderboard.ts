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
        orderBy: [{ point: "desc" }, { name: "asc" }],
        take: input.limit,
        skip: (input.cursor - 1) * input.limit,
        include: {
          user: true,
        },
      });

      const baseRank = (input.cursor - 1) * input.limit;

      const totalCount = await ctx.prisma.profile.aggregate({
        _count: { userId: true },
      });

      const leaderboardData: Leaderboard[] = profileData.map(
        (profile, index) => ({
          userId: profile.userId,
          name: profile.name,
          profileImage: profile.image,
          point: profile.point,
          rank: baseRank + 1 + index,
          nim: profile.user.nim,
        })
      );

      return {
        data: leaderboardData,
        nextCursor:
          leaderboardData.length < input.limit ? undefined : input.cursor + 1,
        totalPage: Math.ceil(totalCount._count.userId / input.limit),
      };
    }),

  getSelfLeaderboard: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.$queryRaw<
      { userId: string; point: number; position: number }[]
    >`with "ranking" as (
        select "userId", "point",
            row_number() over (order by "point" desc, "name" asc ) as "position"
        from "Profile"
    )
    select * from "ranking" where "userId" = uuid(${ctx.session.user.id})`;

    const selfPos = result[0];

    if (!selfPos) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Self position not found",
      });
    }

    const user = await ctx.prisma.profile.findUnique({
      where: { userId: ctx.session.user.id },
      include: { user: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return {
      userId: user.userId,
      name: user.name,
      profileImage: user.image,
      point: user.point,
      rank: Number(selfPos.position),
      nim: user.user.nim,
    };
  }),
});
