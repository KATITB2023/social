import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello world";
  }),
});
