import { storageRouter } from "~/server/api/routers/storage";
import { createTRPCRouter } from "~/server/api/trpc";
import { messageRouter } from "./routers/message";
import { authRouter } from "~/server/api/routers/auth";
import { friendRouter } from "~/server/api/routers/friend";
import { profileRouter } from "~/server/api/routers/profile";
import { absensiRouter } from "~/server/api/routers/absensi";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  storage: storageRouter,
  message: messageRouter,
  auth: authRouter,
  friend: friendRouter,
  profile: profileRouter,
  absensi: absensiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
