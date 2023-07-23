import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type ChatHeader } from "~/server/types/message";

export const anonymousMessageRouter = createTRPCRouter({
  chatHeader: protectedProcedure.query(
    // delete me after implementation
    // eslint-disable-next-line @typescript-eslint/require-await
    async ({ ctx }): Promise<ChatHeader[]> => {
      return [];
    }
  ),
});
