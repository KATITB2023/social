import { type Profile } from "@prisma/client";
import { createTRPCRouter } from "~/server/api/trpc";

export type FRIENDSHIP_STATUS = "NOT_FRIEND" | "FRIEND" | "REQUESTED";

export type SelfProfile = {
  id: string;
  nim: string;
} & Omit<Profile, "updatedAt" | "userId">;

export type UserProfile = SelfProfile & {
  status: FRIENDSHIP_STATUS;
};

export const profileRouter = createTRPCRouter({});
