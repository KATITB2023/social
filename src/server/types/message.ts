import { type Message } from "@prisma/client";

export interface ChatHeader {
  message: Message;
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
}
