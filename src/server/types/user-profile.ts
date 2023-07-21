import { type Profile } from "@prisma/client";
import { type FRIENDSHIP_STATUS } from "./friendship";

/* Status pertemanan
 * REQUESTING_FRIENDSHIP: ketika user A (yang login saat ini) mengirim permintaan pertemanan kepada B, tetapi belum diterima
 * WAITING_FOR_ACCEPTANCE: ketika user B mengirim permintaan kepada user A (yang login saat ini), tetapi belum diterima
 * */

export type SelfProfile = {
  id: string;
  nim: string;
} & Omit<Profile, "updatedAt" | "userId">;

export type UserProfile = SelfProfile & {
  status: FRIENDSHIP_STATUS;
};
