import { type Gender, type Message, type UserMatch } from "@prisma/client";

export enum ChatTopic {
  ITB = "ITB",
}

export interface AnonChatHeader {
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  userMatch: UserMatch;
}

export interface NonAnonChatHeader {
  lastMessage: Message;
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  unreadMessageCount: number;
}

export interface UserQueue {
  userId: string;
  isAnonymous: boolean;
  topic: ChatTopic;
  isFindingFriend: boolean;
  gender: Gender;
}
