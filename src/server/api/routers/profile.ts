import { type Profile } from "@prisma/client";
import { createTRPCRouter } from "~/server/api/trpc";

/* Status pertemanan
 * REQUESTING_FRIENDSHIP: ketika user A (yang login saat ini) mengirim permintaan pertemanan kepada B, tetapi belum diterima
 * WAITING_FOR_ACCEPTANCE: ketika user B mengirim permintaan kepada user A (yang login saat ini), tetapi belum diterima
 * */
export type FRIENDSHIP_STATUS =
  | "NOT_FRIEND"
  | "FRIEND"
  | "REQUESTING_FRIENDSHIP"
  | "WAITING_FOR_ACCEPTANCE";

export type SelfProfile = {
  id: string;
  nim: string;
} & Omit<Profile, "updatedAt" | "userId">;

export type UserProfile = SelfProfile & {
  status: FRIENDSHIP_STATUS;
};

export const profileRouter = createTRPCRouter({});
