import { type Message } from "@prisma/client";

export enum ChatTopic {
  ITB = "ITB",
}

export interface ChatHeader {
  message: Message;
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
}

export interface UserQueue {
  userId: string;
}
