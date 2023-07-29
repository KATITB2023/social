import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type Leaderboard } from "~/server/types/leaderboard";

export const leaderboardRouter = createTRPCRouter({
  getLeaderboard: publicProcedure.query((): Leaderboard[] => {
    return [];
  }),
  userPosition: protectedProcedure.query((): Leaderboard => {
    return {} as Leaderboard;
  }),
});
