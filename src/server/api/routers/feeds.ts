import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const feedRouter = createTRPCRouter({
  getFeeds: protectedProcedure.query(() => "hello"),
  react: protectedProcedure.mutation(() => "hello"),
});
