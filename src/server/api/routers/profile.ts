import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello world";
  }),
});
