import { type Message } from "@prisma/client";

export enum ChatTopic {
  ITB = "ITB",
}

export interface AnonChatHeader {
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
}

export interface NonAnonChatHeader {
  lastMessage: Message;
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
  unreadMessageCount: number;
}

export interface UserQueue {
  userId: string;
}
