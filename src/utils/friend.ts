import { type Friendship } from "@prisma/client";
import { type FRIENDSHIP_STATUS } from "~/server/types/friendship";

/***
 * Generate the friendship status from the friendships owned by userId
 */
export const getFriendStatus = (
  friendships: Friendship[],
  userId: string
): Record<string, FRIENDSHIP_STATUS> => {
  const statusMap: Record<string, FRIENDSHIP_STATUS> = {};
  friendships.forEach((friendship) => {
    const id =
      friendship.userInitiatorId === userId
        ? friendship.userReceiverId
        : friendship.userInitiatorId;
    if (friendship.accepted) {
      statusMap[id] = "FRIEND";
    } else {
      if (friendship.userInitiatorId === userId) {
        statusMap[id] = "REQUESTING_FRIENDSHIP";
      } else {
        statusMap[id] = "WAITING_FOR_ACCEPTANCE";
      }
    }
  });
  return statusMap;
};
