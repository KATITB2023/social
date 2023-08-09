import { createTRPCRouter } from "~/server/api/trpc";
import { messageRouter } from "./routers/message";
import { authRouter } from "~/server/api/routers/auth";
import { friendRouter } from "~/server/api/routers/friend";
import { profileRouter } from "~/server/api/routers/profile";
import { absensiRouter } from "~/server/api/routers/absensi";
import { anonymousMessageRouter } from "~/server/api/routers/anon-message";
import { assignmentRouter } from "~/server/api/routers/assignment";
import { feedRouter } from "~/server/api/routers/feeds";
import { leaderboardRouter } from "~/server/api/routers/leaderboard";
import { emailRouter } from "~/server/api/routers/email";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  message: messageRouter,
  messageAnonymous: anonymousMessageRouter,
  auth: authRouter,
  friend: friendRouter,
  profile: profileRouter,
  absensi: absensiRouter,
  assignment: assignmentRouter,
  feed: feedRouter,
  leaderboard: leaderboardRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
