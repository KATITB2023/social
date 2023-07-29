import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type Feed as BaseFeed } from "@prisma/client";

export interface Feed extends BaseFeed {
  reactions: {
    [k: string]: {
      count: number;
      reacted: boolean;
    };
  };
  read: boolean;
}

export const feedRouter = createTRPCRouter({
  getFeeds: protectedProcedure.query(() => "hello"),
  react: protectedProcedure.mutation(() => "hello"),
});
